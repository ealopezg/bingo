const functions = require("firebase-functions");
var uniqid = require("uniqid"); 
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// eslint-disable-next-line no-unused-vars
exports.newGame = functions.https.onCall((_data, _context) => {
      const id = uniqid();
      admin
        .database()
        .ref("games/" + id)
        .set({
          id: id,
          last: "B00",
          timestamp: new Date().getTime(),
          numbers: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
            11: false,
            12: false,
            13: false,
            14: false,
            15: false,
            16: false,
            17: false,
            18: false,
            19: false,
            20: false,
            21: false,
            22: false,
            23: false,
            24: false,
            25: false,
            26: false,
            27: false,
            28: false,
            29: false,
            30: false,
            31: false,
            32: false,
            33: false,
            34: false,
            35: false,
            36: false,
            37: false,
            38: false,
            39: false,
            40: false,
            41: false,
            42: false,
            43: false,
            44: false,
            45: false,
            46: false,
            47: false,
            48: false,
            49: false,
            50: false,
            51: false,
            52: false,
            53: false,
            54: false,
            55: false,
            56: false,
            57: false,
            58: false,
            59: false,
            60: false,
            61: false,
            62: false,
            63: false,
            64: false,
            65: false,
            66: false,
            67: false,
            68: false,
            69: false,
            70: false,
            71: false,
            72: false,
            73: false,
            74: false,
            75: false,
          },
        });
      return { id: id };
});

