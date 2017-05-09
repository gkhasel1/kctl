import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Students = new Mongo.Collection('students');

Students.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const StudentSchema = new SimpleSchema({
  firstName: {
    label: "Students first name",
    type: String,
  },
  lastName: {
    label: "Students last name",
    type: String,
  },
  gender: {
    label: "Students gender",
    type: String,
    allowedValues: ['male', 'female'],
  },
  dob: {
    label: "Students date of birth",
    type: String,
  },
  parentName: {
    label: "Parents full name",
    type: String,
  },
  parentEmail: {
    label: "Parents email address",
    type: String,
  },
  parentPrimaryPhone: {
    label: "Parents primary phone number",
    type: String,
  },
  parentSecondaryPhone: {
    label: "Parents secondary phone number",
    type: String,
  },
  parentAddress: {
    label: "Parents primary address",
    type: String,
  },
  housing: {
    label: "Parent/child living in the courts housing",
    type: String,
    allowedValues: ['both', 'child', 'parent', 'neither'],
  },
  otherHousing: {
    label: "Parent/child living in other housing",
    type: String,
    optional: true,
  },
  otherHousingName: {
    label: "Name of other housing",
    type: String,
    optional: true,
  },
  income: {
    label: "Household income",
    type: String,
    allowedValues: ['25below', '25to50', '50to75', '75above'],
  },
  members: {
    label: "Number of household members",
    type: String,
    allowedValues: ['1', '2', '3', '4', '5', '6'],
  },
  race: {
    label: "Students Race/Ethnicity",
    type: String,
    allowedValues: ['black', 'white', 'hispanic', 'asian-pacific', 'native-american', 'middle-east'],
  },
  emergencyName: {
    label: "Emergency contact name",
    type: String,
  },
  emergencyPhone: {
    label: "Emergency contact phone",
    type: String,
  },
  emergencyRelationship: {
    label: "Emergency contact relationship to student",
    type: String,
  },
  allergy: {
    label: "Students allergies",
    type: String,
    optional: true,
  },
  medical: {
    label: "Students medical conditions",
    type: String,
    optional: true,
  },
  uniform: {
    label: "Students uniform size",
    type: String,
    allowedValues: ['XS', 'S', 'M', 'L', 'XL'],
  },
  referral: {
    label: "Referred to KCTL by",
    type: String,
    allowedValues: ['flyer', 'nycha', 'social', 'bbbs', 'word', 'other'],
  },
  referralOther: {
    label: "Referred by other source name",
    type: String,
    optional: true,
  },
  createdAt: {
    label: "Datetime that student was created",
    type: Date,
  },
  court: {
    label: "Court student is playing on.",
    type: String,
    allowedValues: ['marcy', 'sumner', 'robinson', 'lafayette', 'tompkins'],
  },
});
