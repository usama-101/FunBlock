use soroban_sdk::{contracttype, Vec, Address, String};
 

#[derive(Clone)]
#[contracttype]
pub struct Campaign {
    pub owner: Address,
    pub id: u64,
    pub start: u64,
    pub end: u64,
    pub amount: i128,
    pub helpers: Vec<Address>,
}
#[derive(Clone)]
#[contracttype]
pub struct Campaigns {
    pub ids: Vec<u64>
}