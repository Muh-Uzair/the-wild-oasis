import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { TOTAL_RESULTS_ON_PAGE } from "../utils/constants";

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getAllBookings(filterByObj, sortByObj, currentPage) {
  let query = supabase
    .from("bookings")
    .select(
      "id , created_at , startDate , endDate , numNights , numGuests , status , totalPrice , cabins(name) , guests(fullName , email)",
      { count: "exact" }
    );

  // filter logic
  if (filterByObj !== null)
    query = query[filterByObj.method](
      filterByObj.field,
      filterByObj.filterValue
    );

  // sort logic
  if (sortByObj !== null)
    query = query.order(sortByObj.field, {
      ascending: sortByObj.direction === "asc",
    });

  // pagination logic
  if (currentPage) {
    const from = (currentPage - 1) * TOTAL_RESULTS_ON_PAGE;
    const to = from + TOTAL_RESULTS_ON_PAGE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Unable to load all bookings");
  }

  return { data, count };
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

export async function updateBookingStatus(id, updatedObj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedObj)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}
