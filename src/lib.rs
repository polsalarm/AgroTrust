#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, token, Address, Env,
};

// ── Errors ────────────────────────────────────────────────────────────────────

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidAmount = 3,
    NotAuthorized = 4,
    InvalidState = 5,
}

// ── Storage and States ────────────────────────────────────────────────────────

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum EscrowState {
    AwaitingDeposit,
    Funded,
    Completed,
    Refunded,
}

#[contracttype]
pub enum DataKey {
    Token, // Will hold the Native XLM Contract Address
    Buyer,
    Seller,
    Arbiter,
    Amount,
    State,
}

// ── Contract ──────────────────────────────────────────────────────────────────

#[contract]
pub struct AgroTrustEscrow;

#[contractimpl]
impl AgroTrustEscrow {
    /// Initialize the escrow with the participants, the token (Native XLM), and the locked amount.
    pub fn initialize(
        env: Env,
        token: Address,
        buyer: Address,
        seller: Address,
        arbiter: Address,
        amount: i128,
    ) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::State) {
            return Err(Error::AlreadyInitialized);
        }
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::Buyer, &buyer);
        env.storage().instance().set(&DataKey::Seller, &seller);
        env.storage().instance().set(&DataKey::Arbiter, &arbiter);
        env.storage().instance().set(&DataKey::Amount, &amount);
        env.storage().instance().set(&DataKey::State, &EscrowState::AwaitingDeposit);
        Ok(())
    }

    /// Buyer locks the XLM by depositing it into the smart contract.
    pub fn deposit(env: Env) -> Result<(), Error> {
        let state: EscrowState = env.storage().instance().get(&DataKey::State).ok_or(Error::NotInitialized)?;
        if state != EscrowState::AwaitingDeposit {
            return Err(Error::InvalidState);
        }
        
        let buyer: Address = env.storage().instance().get(&DataKey::Buyer).unwrap();
        let token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        
        // Ensure the buyer is the one authorizing the locking of their XLM via Freighter
        buyer.require_auth();
        
        let client = token::Client::new(&env, &token);
        client.transfer(&buyer, &env.current_contract_address(), &amount);
        
        env.storage().instance().set(&DataKey::State, &EscrowState::Funded);
        Ok(())
    }

    /// Arbiter (e.g., local co-op) confirms the goods arrived, releasing XLM to the farmer.
    pub fn confirm_delivery(env: Env) -> Result<(), Error> {
        let state: EscrowState = env.storage().instance().get(&DataKey::State).ok_or(Error::NotInitialized)?;
        if state != EscrowState::Funded {
            return Err(Error::InvalidState);
        }
        
        let arbiter: Address = env.storage().instance().get(&DataKey::Arbiter).unwrap();
        arbiter.require_auth();
        
        let seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
        let token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        
        let client = token::Client::new(&env, &token);
        client.transfer(&env.current_contract_address(), &seller, &amount);
        
        env.storage().instance().set(&DataKey::State, &EscrowState::Completed);
        Ok(())
    }

    /// Arbiter can refund the buyer's XLM if the goods never arrive.
    pub fn refund(env: Env) -> Result<(), Error> {
        let state: EscrowState = env.storage().instance().get(&DataKey::State).ok_or(Error::NotInitialized)?;
        if state != EscrowState::Funded {
            return Err(Error::InvalidState);
        }
        
        let arbiter: Address = env.storage().instance().get(&DataKey::Arbiter).unwrap();
        arbiter.require_auth();
        
        let buyer: Address = env.storage().instance().get(&DataKey::Buyer).unwrap();
        let token: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let amount: i128 = env.storage().instance().get(&DataKey::Amount).unwrap();
        
        let client = token::Client::new(&env, &token);
        client.transfer(&env.current_contract_address(), &buyer, &amount);
        
        env.storage().instance().set(&DataKey::State, &EscrowState::Refunded);
        Ok(())
    }

    /// Helper view function to check the current status of the escrow.
    pub fn get_state(env: Env) -> Result<EscrowState, Error> {
        env.storage().instance().get(&DataKey::State).ok_or(Error::NotInitialized)
    }
}

#[cfg(test)]
mod test;
