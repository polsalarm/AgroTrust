#![cfg(test)]

use crate::{AgroTrustEscrow, AgroTrustEscrowClient, EscrowState, Error};
use soroban_sdk::{testutils::{Address as _}, Address, Env, token};

fn setup_test<'a>() -> (
    Env,
    AgroTrustEscrowClient<'a>,
    Address,
    Address,
    Address,
    Address,
    token::Client<'a>,
    token::StellarAssetClient<'a>,
) {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, AgroTrustEscrow);
    let client = AgroTrustEscrowClient::new(&env, &contract_id);

    let token_admin = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract(token_admin.clone());
    
    let token_client = token::Client::new(&env, &token_id);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_id);
    
    let buyer = Address::generate(&env);
    let seller = Address::generate(&env);
    let arbiter = Address::generate(&env);

    (
        env,
        client,
        token_id,
        buyer,
        seller,
        arbiter,
        token_client,
        token_admin_client,
    )
}

#[test]
fn test_initialize_success() {
    let (_env, client, token, buyer, seller, arbiter, _, _) = setup_test();
    let amount = 1000;
    
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    
    assert_eq!(client.get_state(), EscrowState::AwaitingDeposit);
}

#[test]
fn test_initialize_already_initialized() {
    let (_env, client, token, buyer, seller, arbiter, _, _) = setup_test();
    let amount = 1000;
    
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    let res = client.try_initialize(&token, &buyer, &seller, &arbiter, &amount);
    
    assert_eq!(res.unwrap_err().unwrap(), Error::AlreadyInitialized);
}

#[test]
fn test_initialize_invalid_amount() {
    let (_env, client, token, buyer, seller, arbiter, _, _) = setup_test();
    let amount = 0;
    
    let res = client.try_initialize(&token, &buyer, &seller, &arbiter, &amount);
    assert_eq!(res.unwrap_err().unwrap(), Error::InvalidAmount);
}

#[test]
fn test_deposit_success() {
    let (_env, client, token, buyer, seller, arbiter, token_client, token_admin) = setup_test();
    let amount = 1000;
    
    token_admin.mint(&buyer, &amount);
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    
    client.deposit();
    
    assert_eq!(client.get_state(), EscrowState::Funded);
    assert_eq!(token_client.balance(&buyer), 0);
    assert_eq!(token_client.balance(&client.address), amount);
}

#[test]
fn test_deposit_not_initialized() {
    let (_env, client, _token, _buyer, _seller, _arbiter, _, _) = setup_test();
    
    let res = client.try_deposit();
    assert_eq!(res.unwrap_err().unwrap(), Error::NotInitialized);
}

#[test]
fn test_deposit_invalid_state() {
    let (_env, client, token, buyer, seller, arbiter, _token_client, token_admin) = setup_test();
    let amount = 1000;
    
    token_admin.mint(&buyer, &2000);
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    client.deposit();
    
    let res = client.try_deposit();
    assert_eq!(res.unwrap_err().unwrap(), Error::InvalidState);
}

#[test]
fn test_confirm_delivery_success() {
    let (_env, client, token, buyer, seller, arbiter, token_client, token_admin) = setup_test();
    let amount = 1000;
    
    token_admin.mint(&buyer, &amount);
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    client.deposit();
    
    client.confirm_delivery();
    
    assert_eq!(client.get_state(), EscrowState::Completed);
    assert_eq!(token_client.balance(&client.address), 0);
    assert_eq!(token_client.balance(&seller), amount);
}

#[test]
fn test_confirm_delivery_not_funded() {
    let (_env, client, token, buyer, seller, arbiter, _token_client, _token_admin) = setup_test();
    let amount = 1000;
    
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    
    let res = client.try_confirm_delivery();
    assert_eq!(res.unwrap_err().unwrap(), Error::InvalidState);
}

#[test]
fn test_refund_success() {
    let (_env, client, token, buyer, seller, arbiter, token_client, token_admin) = setup_test();
    let amount = 1000;
    
    token_admin.mint(&buyer, &amount);
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    client.deposit();
    
    client.refund();
    
    assert_eq!(client.get_state(), EscrowState::Refunded);
    assert_eq!(token_client.balance(&client.address), 0);
    assert_eq!(token_client.balance(&buyer), amount);
}

#[test]
fn test_refund_not_funded() {
    let (_env, client, token, buyer, seller, arbiter, _token_client, _token_admin) = setup_test();
    let amount = 1000;
    
    client.initialize(&token, &buyer, &seller, &arbiter, &amount);
    
    let res = client.try_refund();
    assert_eq!(res.unwrap_err().unwrap(), Error::InvalidState);
}

#[test]
fn test_get_state_not_initialized() {
    let (_env, client, _token, _buyer, _seller, _arbiter, _, _) = setup_test();
    let res = client.try_get_state();
    assert_eq!(res.unwrap_err().unwrap(), Error::NotInitialized);
}
