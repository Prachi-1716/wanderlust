const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
let {listings} = require("./demoListings.js");
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
console.log(listings);
const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL);
    console.log("connected to wanderlust");
  } catch (err) {
    console.log(err);
  }
};

main();

Listing.deleteMany({}).then(res => {
    console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });

 listings = listings.map(obj=>{
    return {...obj, owner: "686fd7e4eec09200478bc2a5"};
  });
  
    const updates = [
      { title: "Mountain Retreat", category: "amazingView" },
      { title: "Historic Villa in Tuscany", category: "iconicCities" },
      { title: "Secluded Treehouse Getaway", category: "petFriendly" },
      { title: "Beachfront Paradise", category: "beachfront" },
      { title: "Rustic Cabin by the Lake", category: "amazingView" },
      { title: "Luxury Penthouse with City Views", category: "luxury" },
      { title: "Sky-High-Out Chalet", category: "amazingView" },
      { title: "Safari Lodge in the Savanna", category: "trending" },
      { title: "Historic Canal House", category: "iconicCities" },
      { title: "Private Island Retreat", category: "luxury" },
      { title: "Charming Cottage in the Cotswolds", category: "iconicCities" },
      { title: "Historic Homebase in Venice", category: "iconicCities" },
      { title: "Beachfront Bungalow in Bali", category: "beachfront" },
      { title: "Mountain View Cabin in Banff", category: "amazingView" },
      { title: "Art Deco Apartment in Miami", category: "rooms" },
      { title: "Tropical Villa in Phuket", category: "pools" },
      { title: "Historic Castle in Scotland", category: "iconicCities" },
      { title: "Desert Oasis in Dubai", category: "luxury" },
      { title: "Rustic Log Cabin in Montana", category: "farms" },
      { title: "Beachfront Villa in Greece", category: "beachfront" },
      { title: "Eco-Friendly Treehouse Retreat", category: "petFriendly" },
      { title: "Historic Cottage in Charleston", category: "iconicCities" },
      { title: "Modern Apartment in Tokyo", category: "rooms" },
      { title: "Lakefront Cabin in New Hampshire", category: "boating" },
      { title: "Luxury Villa in the Maldives", category: "luxury" },
      { title: "Ski Chalet in Aspen", category: "amazingView" },
      { title: "Secluded Beach House in Costa Rica", category: "beachfront" },
      { title: "Nature Overlook", category: "amazingView" }
    ];

    for (let update of updates) {
      let listing = listings.find(l => l.title === update.title);
      if(listing){
        listing.category = update.category;
      }
    }

Listing.insertMany(listings)
  .then(res => {
    console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });



 

// console.log(listings);
