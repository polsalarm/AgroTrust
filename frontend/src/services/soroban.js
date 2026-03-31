import { TransactionBuilder, Contract, rpc, Networks, Address, nativeToScVal, Operation, xdr } from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID;
const RPC_URL = import.meta.env.VITE_RPC_URL;
const NETWORK_PASSPHRASE = Networks.TESTNET; 
const HORIZON_URL = import.meta.env.VITE_HORIZON_URL ?? 'https://horizon-testnet.stellar.org';
const NATIVE_TOKEN_ID = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';

if (!RPC_URL) throw new Error("VITE_RPC_URL is not defined. Check your .env file.");
if (!CONTRACT_ID) throw new Error("VITE_CONTRACT_ID is not defined. Check your .env file.");

const server = new rpc.Server(RPC_URL, { allowHttp: false });

// ─── Helpers ────────────────────────────────────────────────────────────────

async function buildAndSubmit(publicKey, methodName, argsArray = []) {
    console.log(`[buildAndSubmit] Calling ${methodName}...`);

    const account = await server.getAccount(publicKey);
    const contract = new Contract(CONTRACT_ID);

    const tx = new TransactionBuilder(account, {
        fee: '10000', // Higher fee for Soroban resource coverage
        networkPassphrase: NETWORK_PASSPHRASE,
    })
        .addOperation(contract.call(methodName, ...argsArray))
        .setTimeout(60)
        .build();

    console.log(`[buildAndSubmit] Preparing ${methodName}...`);
    
    // We use prepareTransaction as it's the safest official wrapper
    // but we add a fallback for the toXDR/e4.switch issues
    let preparedTx;
    try {
        preparedTx = await server.prepareTransaction(tx);
    } catch (e) {
        console.warn(`[buildAndSubmit] prepareTransaction failed for ${methodName}. Attempting raw assembly fallback.`, e);
        const sim = await server.simulateTransaction(tx);
        preparedTx = rpc.assembleTransaction(tx, sim);
    }

    console.log(`[buildAndSubmit] Preparation finished. Awaiting signature...`);
    
    // Low-level XDR extraction is more robust across different SDK builds/minifications
    const xdrToSign = preparedTx.toEnvelope 
        ? preparedTx.toEnvelope().toXDR().toString("base64") 
        : (preparedTx.toXDR ? preparedTx.toXDR() : preparedTx);

    const signedXdr = await signTransaction(xdrToSign, {
        network: 'TESTNET',
        accountToSign: publicKey,
    });

    const txToSubmit = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    const sendResponse = await server.sendTransaction(txToSubmit);
    
    if (sendResponse.status === 'ERROR') {
        throw new Error('Transaction failed: ' + JSON.stringify(sendResponse.errorResultXdr));
    }

    return await pollTransactionStatus(sendResponse.hash);
}

async function pollTransactionStatus(hash, retries = 20, intervalMs = 3000) {
    for (let i = 0; i < retries; i++) {
        const response = await server.getTransaction(hash);

        if (response.status === 'SUCCESS') {
            return {
                hash,
                status: 'SUCCESS',
                result: response.returnValue ?? null,
            };
        }

        if (response.status === 'FAILED') {
            throw new Error(`Transaction ${hash} failed: ` + JSON.stringify(response));
        }

        await new Promise((res) => setTimeout(res, intervalMs));
    }
    throw new Error(`Transaction ${hash} not confirmed after ${retries} retries.`);
}

// ─── Exported Contract Calls ─────────────────────────────────────────────────

export async function depositEscrow(publicKey, sellerAddress, amountXLM) {
    console.log(`[depositEscrow] Starting process for ${amountXLM} XLM...`);
    // Pre-initialized via CLI, so we go straight to deposit!
    console.log("[depositEscrow] Launching XLM Deposit (Freighter Popup)...");
    return await buildAndSubmit(publicKey, 'deposit');
}

export async function confirmDelivery(publicKey) {
    return await buildAndSubmit(publicKey, 'confirm_delivery');
}

export async function refundEscrow(publicKey) {
    return await buildAndSubmit(publicKey, 'refund');
}

/**
 * Fetches Native XLM balance via Horizon (rpc.Server does not expose balances).
 */
export async function getNativeBalance(publicKey) {
    try {
        const response = await fetch(`${HORIZON_URL}/accounts/${publicKey}`);

        if (response.status === 404) return '0.00'; // Unfunded account
        if (!response.ok) throw new Error(`Horizon error: ${response.status}`);

        const data = await response.json();
        const native = data.balances?.find((b) => b.asset_type === 'native');
        return native?.balance ?? '0.00';
    } catch (e) {
        console.error('Error fetching balance:', e);
        return '0.00';
    }
}