import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Volunteers = new Mongo.Collection('volunteers');

Volunteers.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const VolunteerSchema = new SimpleSchema({
  firstName: {
    label: "Volunteers first name",
    type: String,
  },
  lastName: {
    label: "Volunteers last name",
    type: String,
  },
  phone: {
    label: "Volunteers primary phone number",
    type: String,
  },
  email: {
    label: "Volunteers email address",
    type: String,
  },

//   //when do you want to volunteer?
//   //if summer season, preferred housing development
//   //which summer training session
//   //volunteer at play days? (opt)
//   gender: {
//     label: "Volunteers gender",
//     type: String,
//     allowedValues: ['male', 'female'],
//   },
//   dob: {
//     label: "Volunteers date of birth",
//     type: String,
//   },
//   street: {
//     label: "Volunteers street address",
//     type: String,
//   },
//   city: {
//     label: "Volunteers city",
//     type: String,
//   },
//   state: {
//     label: "Volunteers state",
//     type: String,
//   },
//   zip: {
//     label: "Volunteers zipcode",
//     type: String,
//   },
//   borough: {
//     label: "Parent/child living in the courts housing",
//     type: String,
//     allowedValues: ['manhattan', 'brooklyn', 'queens', 'bronx', 'staten', 'none'],
//   },
//   otherHousing: {
//     label: "Parent/child living in other housing",
//     type: String,
//     optional: true,
//   },
//   otherHousingName: {
//     label: "Name of other housing",
//     type: String,
//     optional: true,
//   },
//   income: {
//     label: "Household income",
//     type: String,
//     allowedValues: ['25below', '25to50', '50to75', '75above'],
//   },
//   members: {
//     label: "Number of household members",
//     type: String,
//     allowedValues: ['1', '2', '3', '4', '5', '6'],
//   },
//   race: {
//     label: "Volunteers Race/Ethnicity",
//     type: String,
//     allowedValues: ['black', 'white', 'hispanic', 'asian-pacific', 'native-american', 'middle-east'],
//   },
//   emergencyName: {
//     label: "Emergency contact name",
//     type: String,
//   },
//   emergencyPhone: {
//     label: "Emergency contact phone",
//     type: String,
//   },
//   emergencyRelationship: {
//     label: "Emergency contact relationship to volunteer",
//     type: String,
//   },
//   allergy: {
//     label: "Volunteers allergies",
//     type: String,
//     optional: true,
//   },
//   medical: {
//     label: "Volunteers medical conditions",
//     type: String,
//     optional: true,
//   },
//   uniform: {
//     label: "Volunteers uniform size",
//     type: String,
//     allowedValues: ['XS', 'S', 'M', 'L', 'XL'],
//   },
//   referral: {
//     label: "Referred to KCTL by",
//     type: String,
//     allowedValues: ['flyer', 'nycha', 'social', 'bbbs', 'word', 'other'],
//   },
//   referralOther: {
//     label: "Referred by other source name",
//     type: String,
//     optional: true,
//   },
  createdAt: {
    label: "Datetime that volunteer was created",
    type: Date,
  },
  court: {
    label: "Court volunteer is playing on.",
    type: String,
    allowedValues: ['marcy', 'sumner', 'robinson', 'lafayette', 'tompkins'],
  },
});
