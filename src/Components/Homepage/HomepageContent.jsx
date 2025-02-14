import Heading from "../../common/Heading";
import UserBalanceMostExpensiveGrid from "../Layout/UserBalanceMostExpensiveGrid/UserBalanceMostExpensiveGrid";
import ExpenseTable from "./ExpenseTable";
import SeeTransactions from "./SeeTransactions";
import MonthlyReport from "../MonthlyReport/MonthlyReport";

const HomepageContent = ({ showAllTransactions, expenses, showMonthlyAnalysis }) => {
    if(showAllTransactions)
        return <SeeTransactions />
    if(showMonthlyAnalysis)
        return <MonthlyReport/>
    return (
        <>
            <Heading />
            <UserBalanceMostExpensiveGrid />
            <ExpenseTable expenses={expenses} />
        </>
    );
};

export default HomepageContent;
