// const { InvestSchema } = require("../modals/invest");
// const { PriceSchema } = require("../modals/price");
// const { TokenPriceSchema } = require("../modals/tokenPrice");
// const { SpamSchema } = require("../modals/spam");
// const { PresaleSchema2 } = require("../modals/setting");

// const Invest = async (req, res) => {
//   try {
//     let { investorAddress, txHash, round, tier, investedAmount, network } = req.body;
//     let minAmount = 0.1;
//     let maxInvest = 0;
//     let spamAmountForMax = 0;
//     let spamAmountForMin = 0;

//     // Fetch the current price data
//     const price = await PriceSchema.findOne();
//     const tokenPrice = await TokenPriceSchema.findOne();
//     let multiplier = 1; // Default multiplier
//     let tokenprice = tokenPrice.tokenPrice;

//     if (network === "eth" && price) {
//       multiplier = price.ethPrice;
//     } else if (network === "bsc" && price) {
//       multiplier = price.bscPrice;
//     }

//     const tiersMax = await PresaleSchema2.find();

//     if (tier == 1) {
//       maxInvest = tiersMax[0].tier1;
//     } else if (tier == 2) {
//       maxInvest = tiersMax[0].tier2;
//     }

//     console.log("maxinvesttt", maxInvest);

//     if (investedAmount > maxInvest) {
//       spamAmountForMax = investedAmount - maxInvest;
//       investedAmount = maxInvest;
//     }

//     if (investedAmount <= minAmount) {
//       spamAmountForMin = investedAmount;
//     }

//     // console.log(spamAmount);

//     if (spamAmountForMax > 0 || spamAmountForMin > 0) {
//       const existingSpamAddress = await SpamSchema.findOne({ address: investorAddress });
//       if (spamAmountForMin > 0) {
//         if (existingSpamAddress) {
//           existingSpamAddress.totalSpamAmount += spamAmountForMin;
//           existingSpamAddress.tx.push({
//             network: network,
//             txHash: txHash,
//             amount: spamAmountForMin,
//           });

//           await existingSpamAddress.save();
//           return ({
//             code: 200,
//             message: 'Success - Saved data',
//           });
//         } else {
//           const newSpamObj = new SpamSchema({
//             address: investorAddress,
//             totalSpamAmount: investedAmount,
//             tx: [
//               {
//                 network: network,
//                 txHash: txHash,
//                 amount: spamAmount,
//               },
//             ],
//           });

//           await newSpamObj.save();
//           return ({
//             code: 200,
//             message: 'Success - Saved data',
//           });
//         }
//       }


//       // Continue with the valid investment handling

//       if (spamAmountForMax > 0) {
//         if (existingSpamAddress) {
//           existingSpamAddress.totalSpamAmount += spamAmountForMax;
//           existingSpamAddress.tx.push({
//             network: network,
//             txHash: txHash,
//             amount: spamAmountForMax,
//           });

//           await existingSpamAddress.save();

//         } else {
//           const newSpamObj = new SpamSchema({
//             address: investorAddress,
//             totalSpamAmount: investedAmount,
//             tx: [
//               {
//                 network: network,
//                 txHash: txHash,
//                 amount: spamAmountForMax,
//               },
//             ],
//           });

//           await newSpamObj.save();

//         }
//         const existingInvestor = await InvestSchema.findOne({ investorAddress });

//         if (existingInvestor) {
//           // Update existing investor's data
//           let temp = (investedAmount * multiplier) / tokenprice;
//           existingInvestor.totalInvestedAmount += investedAmount * multiplier;
//           existingInvestor.claim.claimAbleToken += temp;
//           existingInvestor.data.push({
//             txHash,
//             round,
//             tier,
//             investedAmount: investedAmount * multiplier,
//           });

//           await existingInvestor.save();
//         } else {
//           // Create a new investor record
//           const newInvestor = new InvestSchema({
//             investorAddress,
//             totalInvestedAmount: investedAmount * multiplier,
//             claim: {
//               claimAbleToken: (investedAmount * multiplier) / tokenprice,
//             },
//             data: [
//               {
//                 txHash,
//                 round,
//                 tier,
//                 investedAmount: investedAmount * multiplier,
//               },
//             ],
//           });

//           await newInvestor.save();
//         }
//       }

//       return ({
//         code: 200,
//         message: 'Success - Saved data',
//       });
//     }

//     // If neither spam nor invalid investment, handle valid investments
//     const existingInvestor = await InvestSchema.findOne({ investorAddress });

//     if (existingInvestor) {
//       // Update existing investor's data
//       let temp = (investedAmount * multiplier) / tokenprice;
//       existingInvestor.totalInvestedAmount += investedAmount * multiplier;
//       existingInvestor.claim.claimAbleToken += temp;
//       existingInvestor.data.push({
//         txHash,
//         round,
//         tier,
//         investedAmount: investedAmount * multiplier,
//       });

//       await existingInvestor.save();
//     } else {
//       // Create a new investor record
//       const newInvestor = new InvestSchema({
//         investorAddress,
//         totalInvestedAmount: investedAmount * multiplier,
//         claim: {
//           claimAbleToken: (investedAmount * multiplier) / tokenprice,
//         },
//         data: [
//           {
//             txHash,
//             round,
//             tier,
//             investedAmount: investedAmount * multiplier,
//           },
//         ],
//       });

//       await newInvestor.save();
//     }

//     return ({
//       code: 200,
//       message: 'Success - Saved data',
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     if (error.name === "ValidationError") {
//       return ({
//         code: 400,
//         message: "Bad Request - Validation error",
//         error: error.message,
//       });
//     } else if (error.name === "MongoError" && error.code === 11000) {
//       return ({
//         code: 409,
//         message: "Conflict - Duplicate wallet address",
//         error: error.message,
//       });
//     } else {
//       return ({
//         code: 500,
//         message: 'Internal Server Error - An error occurred while processing your request',
//         error: error.message,
//       });
//     }
//   }
// };

// module.exports = {
//   Invest
// };













const { InvestSchema } = require("../modals/invest");
const { PriceSchema } = require("../modals/price");
const { TokenPriceSchema } = require("../modals/tokenPrice");
const { SpamSchema } = require("../modals/spam");
const { PresaleSchema2 } = require("../modals/setting");

const Invest = async (req, res) => {
  try {
    let { investorAddress, txHash, round, tier, investedAmount, network } = req.body;
    const minAmount = 0.1

    const price = await PriceSchema.findOne();
    const tokenPrice = await TokenPriceSchema.findOne();
    let multiplier = 1; // Default multiplier
    let tokenprice = tokenPrice.tokenPrice;

    if (network === "eth" && price) {
      multiplier = price.ethPrice;
    } else if (network === "bsc" && price) {
      multiplier = price.bscPrice;
    }
    // const multiplier = (network === "eth" && price) ? price.ethPrice : (network === "bsc" && price) ? price.bscPrice : 1;
    // const tokenprice = tokenPrice ? tokenPrice.tokenPrice : 1;

    const tiersMax = await PresaleSchema2.find();

    if (tier == 1) {
      maxInvest = tiersMax[0].tier1;
    } else if (tier == 2) {
      maxInvest = tiersMax[0].tier2;
    }
    console.log("maxinvetsmenbt",maxInvest);
    let spamAmountForMax = 0;
    let spamAmountForMin = 0;

    if (investedAmount > maxInvest) {
      spamAmountForMax = investedAmount - maxInvest;
      investedAmount = maxInvest;
      console.log("investment",investedAmount);
      console.log("spamAmountForMax",spamAmountForMax);

    }

    if (investedAmount <= minAmount) {
      spamAmountForMin = investedAmount;
    }

    if (spamAmountForMax > 0 || spamAmountForMin > 0) {
      const existingSpamAddress = await SpamSchema.findOne({ address: investorAddress });

      if (spamAmountForMin > 0 || spamAmountForMax > 0) {
        if (existingSpamAddress) {
          existingSpamAddress.totalSpamAmount += spamAmountForMin + spamAmountForMax;
          existingSpamAddress.tx.push({
            network: network,
            txHash: txHash,
            amount: spamAmountForMin + spamAmountForMax,
          });
          await existingSpamAddress.save();
        } else {
          const newSpamObj = new SpamSchema({
            address: investorAddress,
            totalSpamAmount: spamAmountForMin + spamAmountForMax,
            tx: [
              {
                network: network,
                txHash: txHash,
                amount: spamAmountForMin + spamAmountForMax,
              },
            ],
          });
          await newSpamObj.save();
        }
      }

      if (spamAmountForMax > 0) {
        const existingInvestor = await InvestSchema.findOne({ investorAddress });

        if (existingInvestor) {
          let temp = (spamAmountForMax * multiplier) / tokenprice;
          existingInvestor.totalInvestedAmount += spamAmountForMax * multiplier;
          existingInvestor.claim.claimAbleToken += temp;
          existingInvestor.data.push({
            txHash,
            round,
            tier,
            investedAmount: spamAmountForMax * multiplier,
          });
          await existingInvestor.save();
        } else {
          const newInvestor = new InvestSchema({
            investorAddress,
            totalInvestedAmount: spamAmountForMax * multiplier,
            claim: {
              claimAbleToken: (spamAmountForMax * multiplier) / tokenprice,
            },
            data: [
              {
                txHash,
                round,
                tier,
                investedAmount: spamAmountForMax * multiplier,
              },
            ],
          });
          await newInvestor.save();
        }
      }

      return ({
        code: 200,
        message: 'Success - Saved data',
      });
    }

    const existingInvestor = await InvestSchema.findOne({ investorAddress });

    if (existingInvestor) {
      let temp = (investedAmount * multiplier) / tokenprice;
      existingInvestor.totalInvestedAmount += investedAmount * multiplier;
      existingInvestor.claim.claimAbleToken += temp;
      existingInvestor.data.push({
        txHash,
        round,
        tier,
        investedAmount: investedAmount * multiplier,
      });
      await existingInvestor.save();
    } else {
      const newInvestor = new InvestSchema({
        investorAddress,
        totalInvestedAmount: investedAmount * multiplier,
        claim: {
          claimAbleToken: (investedAmount * multiplier) / tokenprice,
        },
        data: [
          {
            txHash,
            round,
            tier,
            investedAmount: investedAmount * multiplier,
          },
        ],
      });
      await newInvestor.save();
    }

    return ({
      code: 200,
      message: 'Success - Saved data',
    });
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "ValidationError") {
      return ({
        code: 400,
        message: "Bad Request - Validation error",
        error: error.message,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return ({
        code: 409,
        message: "Conflict - Duplicate wallet address",
        error: error.message,
      });
    } else {
      return ({
        code: 500,
        message: 'Internal Server Error - An error occurred while processing your request',
        error: error.message,
      });
    }
  }
};

module.exports = {
  Invest
};

