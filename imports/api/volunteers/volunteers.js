import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Volunteers = new Mongo.Collection('volunteers');

Volunteers.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const VolunteerSchema = new SimpleSchema({
  season: {
    label: "Season volunteer is playing in.",
    type: String,
  },
  program: {
    label: "Program volunteer is playing in.",
    type: String,
  },
  site: {
    label: "Site volunteer is playing in.",
    type: String,
  },
  createdAt: {
    label: "Datetime that volunteer was created",
    type: Date,
  },
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
  gender: {
    label: "Volunteers gender",
    type: String,
    allowedValues: ['male', 'female', 'n/a'],
  },
  dob: {
    label: "Volunteers date of birth",
    type: String,
  },
  street: {
    label: "Volunteers street address",
    type: String,
  },
  city: {
    label: "Volunteers city",
    type: String,
  },
  state: {
    label: "Volunteers state",
    type: String,
  },
  zip: {
    label: "Volunteers zipcode",
    type: String,
  },
  borough: {
    label: "Volunteers borough of residence",
    type: String,
    allowedValues: ['manhattan', 'brooklyn', 'queens', 'bronx', 'staten', 'none'],
  },
  degree: {
    label: "Volunteers highest degree",
    type: String,
    allowedValues: [
      'lesshs',
      'hs',
      'associates',
      'bachelors',
      'masters',
      'doctorate'
    ],
  },
  school: {
    label: "School where volunteer got highest degree",
    type: String,
  },
  race: {
    label: "Volunteers Race/Ethnicity",
    type: String,
    allowedValues: ['black', 'white', 'hispanic', 'asian-pacific', 'native-american', 'middle-east'],
  },
  occupation: {
    label: "Volunteers occupation",
    type: String,
  },
  jobTitle: {
    label: "Volunteers Job Title",
    type: String,
  },
  employer: {
    label: "Volunteers employer at time of creation",
    type: String,
  },
  involvement: {
    label: "Volunteer Involvment pref",
    type: [String],
  },
  // involvement.$: {
  //   type: String
  //   allowedValues: [
  //     'tennis',
  //     'curriculum',
  //     'photo',
  //     'fundraising',
  //     'donors',
  //     'grants',
  //     'web',
  //     'finance',
  //     'data',
  //     'marketing',
  //     'community'
  //   ],
  // },
  referral: {
    label: "Referred to KCTL by",
    type: String,
    allowedValues: [
      'meetup',
      'google',
      'word',
      'flyer',
      'facebook',
      'twitter',
      'linkedin',
      'idealist',
      'volunteermatch',
      'NYCService',
      'allforgood',
      'other'
    ],
  },
  referralOther: {
    label: "Referred by other source name",
    type: String,
    optional: true,
  },
  more: {
    label: "Referred by other source name",
    type: String,
    optional: true,
  },
});
