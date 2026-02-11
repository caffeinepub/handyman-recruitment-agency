import Map "mo:core/Map";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Document = {
    fileName : Text;
    fileType : Text;
    blob : Storage.ExternalBlob;
  };

  public type Candidate = {
    id : Nat;
    fullName : Text;
    idNumber : Text;
    phoneNumber : Text;
    email : Text;
    physicalAddress : Text;
    tradeSkill : Text;
    yearsExperience : Nat;
    workAreas : Text;
    timestamp : Int;
    cv : ?Document;
    idCopy : ?Document;
    matricCert : ?Document;
    qualificationCert : ?Document;
  };

  public type Enquiry = {
    id : Nat;
    fullName : Text;
    companyName : ?Text;
    phoneNumber : Text;
    email : Text;
    serviceType : Text;
    location : Text;
    message : Text;
    timestamp : Int;
  };

  public type ContactMessage = {
    id : Nat;
    fullName : Text;
    contactType : { #candidate; #client };
    phoneNumber : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  var candidateIdCounter = 0;
  var enquiryIdCounter = 0;
  var messageIdCounter = 0;

  let candidates = Map.empty<Nat, Candidate>();
  let enquiries = Map.empty<Nat, Enquiry>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  module Candidate {
    public func compareByTimestamp(a : Candidate, b : Candidate) : Order.Order {
      Nat.compare(b.timestamp.toNat(), a.timestamp.toNat());
    };
  };

  module Enquiry {
    public func compareByTimestamp(a : Enquiry, b : Enquiry) : Order.Order {
      Nat.compare(b.timestamp.toNat(), a.timestamp.toNat());
    };
  };

  module ContactMessage {
    public func compareByTimestamp(a : ContactMessage, b : ContactMessage) : Order.Order {
      Nat.compare(b.timestamp.toNat(), a.timestamp.toNat());
    };
  };

  public type CandidateInput = {
    fullName : Text;
    idNumber : Text;
    phoneNumber : Text;
    email : Text;
    physicalAddress : Text;
    tradeSkill : Text;
    yearsExperience : Nat;
    workAreas : Text;
  };

  public shared ({ caller }) func registerCandidate(input : CandidateInput) : async Nat {
    let id = candidateIdCounter;
    let timestamp = Time.now();

    let candidate : Candidate = {
      id;
      fullName = input.fullName;
      idNumber = input.idNumber;
      phoneNumber = input.phoneNumber;
      email = input.email;
      physicalAddress = input.physicalAddress;
      tradeSkill = input.tradeSkill;
      yearsExperience = input.yearsExperience;
      workAreas = input.workAreas;
      timestamp;
      cv = null;
      idCopy = null;
      matricCert = null;
      qualificationCert = null;
    };

    candidates.add(id, candidate);
    candidateIdCounter += 1;
    id;
  };

  public shared ({ caller }) func uploadCandidateDocument(candidateId : Nat, fileName : Text, fileType : Text, blob : Storage.ExternalBlob, docType : Text) : async () {
    switch (candidates.get(candidateId)) {
      case (null) { Runtime.trap("Candidate not found") };
      case (?candidate) {
        let document : Document = {
          fileName;
          fileType;
          blob;
        };

        let updatedCandidate = switch (docType) {
          case ("cv") { { candidate with cv = ?document } };
          case ("idCopy") { { candidate with idCopy = ?document } };
          case ("matricCert") { { candidate with matricCert = ?document } };
          case ("qualificationCert") { { candidate with qualificationCert = ?document } };
          case (_) { Runtime.trap("Invalid document type") };
        };

        candidates.add(candidateId, updatedCandidate);
      };
    };
  };

  public type EnquiryInput = {
    fullName : Text;
    companyName : ?Text;
    phoneNumber : Text;
    email : Text;
    serviceType : Text;
    location : Text;
    message : Text;
  };

  public shared ({ caller }) func submitEnquiry(input : EnquiryInput) : async Nat {
    let id = enquiryIdCounter;
    let timestamp = Time.now();

    let enquiry : Enquiry = {
      id;
      fullName = input.fullName;
      companyName = input.companyName;
      phoneNumber = input.phoneNumber;
      email = input.email;
      serviceType = input.serviceType;
      location = input.location;
      message = input.message;
      timestamp;
    };

    enquiries.add(id, enquiry);
    enquiryIdCounter += 1;
    id;
  };

  public type ContactInput = {
    fullName : Text;
    contactType : { #candidate; #client };
    phoneNumber : Text;
    email : Text;
    message : Text;
  };

  public shared ({ caller }) func submitContactMessage(input : ContactInput) : async Nat {
    let id = messageIdCounter;
    let timestamp = Time.now();

    let contactMessage : ContactMessage = {
      id;
      fullName = input.fullName;
      contactType = input.contactType;
      phoneNumber = input.phoneNumber;
      email = input.email;
      message = input.message;
      timestamp;
    };

    contactMessages.add(id, contactMessage);
    messageIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllCandidates() : async [Candidate] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all candidates");
    };
    sortedCandidates();
  };

  public query ({ caller }) func getCandidatesByTrade(trade : Text) : async [Candidate] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view candidates");
    };

    let filtered = sortedCandidates().values().filter(
      func(c) {
        c.tradeSkill.toLower().contains(#text (trade.toLower()));
      }
    );
    filtered.toArray();
  };

  func sortedCandidates() : [Candidate] {
    let iter = candidates.values();
    iter.toArray().sort(Candidate.compareByTimestamp);
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view enquiries");
    };
    let iter = enquiries.values();
    iter.toArray().sort(Enquiry.compareByTimestamp);
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    let iter = contactMessages.values();
    iter.toArray().sort(ContactMessage.compareByTimestamp);
  };

  public shared ({ caller }) func updateCandidate(id : Nat, input : CandidateInput) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update candidates");
    };

    switch (candidates.get(id)) {
      case (null) { Runtime.trap("Candidate not found") };
      case (?existing) {
        let updated = {
          id;
          fullName = input.fullName;
          idNumber = input.idNumber;
          phoneNumber = input.phoneNumber;
          email = input.email;
          physicalAddress = input.physicalAddress;
          tradeSkill = input.tradeSkill;
          yearsExperience = input.yearsExperience;
          workAreas = input.workAreas;
          timestamp = existing.timestamp;
          cv = existing.cv;
          idCopy = existing.idCopy;
          matricCert = existing.matricCert;
          qualificationCert = existing.qualificationCert;
        };
        candidates.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteCandidate(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete candidates");
    };
    candidates.remove(id);
  };

  public shared ({ caller }) func deleteEnquiry(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete enquiries");
    };
    enquiries.remove(id);
  };

  public shared ({ caller }) func deleteContactMessage(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    contactMessages.remove(id);
  };

  public query ({ caller }) func getPublicContactInfo() : async {
    phone : Text;
    email : Text;
    whatsapp : Text;
    facebook : Text;
    areas : [Text];
  } {
    {
      phone = "0712115763";
      email = "hragency415@gmail.com";
      whatsapp = "https://wa.me/27712115763";
      facebook = "https://www.facebook.com/HandymanRecruitmentAgency";
      areas = ["Uitenhage", "Gqeberha"];
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
