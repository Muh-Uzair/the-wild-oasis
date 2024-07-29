import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      paramsValue="last"
      buttonsArray={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
      initialBtnValue={"7"}
    />
  );
}

export default DashboardFilter;

// <Filter
// paramsValue="status"
// buttonsArray={[
//   { value: "all", label: "All" },
//   { value: "checked-out", label: "Checked out" },
//   { value: "checked-in", label: "Checked in" },
//   { value: "unconfirmed", label: "Unconfirmed" },
// ]}
// initialBtnValue={"all"}
// />
