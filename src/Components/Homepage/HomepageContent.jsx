import Heading from "../../common/Heading";
import UserBalanceMostExpensiveGrid from "./UserBalanceMostExpensiveGrid/UserBalanceMostExpensiveGrid";
import ExpenseTable from "./ExpenseTable";
import SeeTransactions from "./SeeTransactions";

const HomepageContent = ({ showAllTransactions, expenses }) => {
    return showAllTransactions ? (
        <SeeTransactions />
    ) : (
        <>
            <Heading />
            <UserBalanceMostExpensiveGrid />
            <ExpenseTable expenses={expenses} />
        </>
    );
};

export default HomepageContent;
