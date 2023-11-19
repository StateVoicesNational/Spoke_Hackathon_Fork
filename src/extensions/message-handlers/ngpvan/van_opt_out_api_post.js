import {
  getCountryCode,
  getDashedPhoneNumberDisplay
} from "../../lib/phone-format";



const sdk = require('api')('@ngpvan/v1.0#3mv41jln0n2j2e');

export const van_api_optout_post = (contact) => {
    const customFields = JSON.parse(contact.custom_fields || "{}");
    sdk.auth('AVMA.000008.spoke', '5cbf6298-1d2f-897f-e8f1-74466ba8c8c8|0');
    sdk.peoplevanidcanvassresponses({
    canvassContext: {
        inputTypeId: 11,
        phone: {
        dialingPrefix: getCountryCode(contact.cell, phoneCountry).toString(),
        phoneNumber: getDashedPhoneNumberDisplay(contact.cell, phoneCountry),
        smsOptInStatus: 'O'
        },
        contactTypeId: 37
    },
    resultCodeId: 111
    }, {
    vanId: customFields.VanID || customFields.vanid,
    accept: 'text/plain'
    })
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
}