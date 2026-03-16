import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import List "mo:core/List";

actor {
  type Reservation = {
    id : Nat;
    customerName : Text;
    phoneNumber : Text;
    date : Time.Time;
    numGuests : Nat;
    specialRequests : Text;
  };

  module Reservation {
    public func compare(r1 : Reservation, r2 : Reservation) : Order.Order {
      if (r1.id < r2.id) { #less } else if (r1.id > r2.id) { #greater } else { #equal };
    };
  };

  var nextId = 0;
  let reservationList = List.empty<Reservation>();

  public shared ({ caller }) func submitReservation(
    customerName : Text,
    phoneNumber : Text,
    date : Time.Time,
    numGuests : Nat,
    specialRequests : Text,
  ) : async Nat {
    let reservation : Reservation = {
      id = nextId;
      customerName;
      phoneNumber;
      date;
      numGuests;
      specialRequests;
    };
    reservationList.add(reservation);
    nextId += 1;
    reservation.id;
  };

  public query ({ caller }) func getAllReservations() : async [Reservation] {
    reservationList.toArray().sort();
  };
};
