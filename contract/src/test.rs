#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation, Ledger};
use soroban_sdk::{symbol_short, token, vec, log, crypto, Bytes, Address, Env, IntoVal, String};
use token::Client as TokenClient;
use token::StellarAssetClient as TokenAdminClient;
use crate::contract::{FundblockCampaignContract, FundblockCampaignContractClient};
use crate::storage::{Campaign};


fn create_token_contract<'a>(e: &Env, admin: &Address) -> (TokenClient<'a>, TokenAdminClient<'a>) {
    let contract_address = e.register_stellar_asset_contract(admin.clone());
    (
        TokenClient::new(e, &contract_address),
        TokenAdminClient::new(e, &contract_address),
    )
}

fn create_dao_test_contract<'a>(e: &Env) -> FundblockCampaignContractClient<'a> {
    FundblockCampaignContractClient::new(e, &e.register_contract(None, FundblockCampaignContract {}))
}

struct DaoTest<'a> {
    env: Env,
    deposit_address: Address,
    token_admin: Address,
    claim_addresses: Address,
    token: TokenClient<'a>,
    contract: FundblockCampaignContractClient<'a>,
}

impl<'a> DaoTest<'a> {
    fn setup() -> Self {
        let env = Env::default();
        env.mock_all_auths();

        env.ledger().with_mut(|li| {
            li.timestamp = 12345;
        });

        let deposit_address = Address::generate(&env);

        let claim_addresses = Address::generate(&env);

        let token_admin = Address::generate(&env);

        let (token, token_admin_client) = create_token_contract(&env, &token_admin);
        token_admin_client.mint(&deposit_address, &10000000000000000000);

        let contract = create_dao_test_contract(&env);
        DaoTest {
            env,
            deposit_address,
            token_admin,
            claim_addresses,
            token,
            contract,
            
        }
    }
}


#[test]
fn test_create_campaign() {
    let test = DaoTest::setup();
    let start: u64 = test.env.ledger().timestamp();
    let end: u64 = test.env.ledger().timestamp() + 1000;
    let amount:i128 = 45677;
    let id: u64 = 1;
    let verify_id = test.env.ledger().timestamp() * 2;
    assert_eq!(test.contract.create(
        &test.deposit_address,
        &1,
        &start,
        &end,
    ), symbol_short!("done"));

    let dao: Campaign = test.contract.get_campaign(&id);
    assert_eq!(dao.id, id);

   
}

//soroban contract deploy --wasm target/wasm32-unknown-unknown/release/dropzey_airdrop_contract.wasm --source guudc --network testnet