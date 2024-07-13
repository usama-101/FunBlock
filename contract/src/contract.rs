/**Lumst DAO Contract
*/

//CREATES
use soroban_sdk::{contract, contractimpl, token, symbol_short, vec, Symbol, Address, Env, Vec, String};
use crate::storage::{Campaign, Campaigns};

#[contract]
pub struct FundblockCampaignContract;

#[contractimpl]
impl FundblockCampaignContract {
     
    //to create a new campaign with owner address
    pub fn create(env: Env, owner: Address, id: u64, start: u64, end:u64) -> Symbol{
        owner.require_auth();
        let _id = id.clone();
        let _ids = id.clone();
        if !is_campaign(&env, _id) {
            //create an airdrop, verify start and end dates
            let current_date: u64 = env.ledger().timestamp();
            if current_date > end {
                //then move the amount to the contract
                if end >= start {
                    let amount: i128 = 0;
                    //save airdrop
                    let helpers: Vec<Address> = vec![&env];
                    env.storage().instance().set(
                        &id,
                        &Campaign {
                            owner,
                            id,
                            start,
                            end,
                            amount,
                            helpers,
                        },
                    );
                    let campaigns: &str = "campaigns";
                    if env.storage().instance().has(&campaigns) {
                        let mut _campaign: Campaigns = env.storage().instance().get(&campaigns).unwrap();
                        _campaign.ids.push_back(_ids);
                        env.storage().instance().set(
                            &campaigns,
                            &_campaign
                        );
                    }
                    else {
                        let mut ids: Vec<u64> = vec![&env];
                        ids.push_back(_ids);
                        env.storage().instance().set(
                            &campaigns,
                            &Campaigns {
                                ids
                            }
                        );
                    }
                    return symbol_short!("done");
                }
                else {
                    return symbol_short!("samedate");
                }
            }
            else {
                return symbol_short!("lessdate");
            }
        }   
        else {
            return symbol_short!("exist");
        } 
    }

    /**GETTER FUNCTIONS**/

    //returns campaign information
    pub fn get_campaign(env:Env, id:u64) -> Campaign {
        let campaign: Campaign =  env.storage().instance().get(&id).unwrap();
        return campaign;
    }
    //returns all campaign information
    pub fn get_all_campaign(env:Env, ids:Vec<u64>) -> Vec<Campaign> {
        let mut campaigns:Vec<Campaign> = vec![&env];
        for id in ids {
            if env.storage().instance().has(&id) {
                let campaign: Campaign =  env.storage().instance().get(&id).unwrap();
                campaigns.push_back(campaign);
            }
        }
        return campaigns;
    }
    //get all campaign currently
    pub fn get_campaigns(env:Env) -> Campaigns {
        let _campaigns: &str = "campaigns";
        let campaigns: Campaigns =  env.storage().instance().get(&_campaigns).unwrap();
        return campaigns;
    }
 
}

//to check if a campaign has already being created
//Campaign are mapped to uniq id
fn is_campaign(env: &Env, id:u64) -> bool {
    return env.storage().instance().has(&id);
}

