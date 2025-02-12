import Grid from "@mui/material/Grid2";
import {Card, CardContent, Typography} from "@mui/material";
import CurrentBalance from "./CurrentBalance";
import MostExpensivePurchase from "./MostExpensivePurchase";
import React from "react";

const UserBalanceMostExpensiveGrid=()=>{
    return(
        <Grid container spacing={2} sx={{ marginBottom: 2, justifyContent: "space-between" }}>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{borderRadius:8, backgroundColor:"#555555", width: "25vw", padding: 2, textAlign: "center", boxShadow: 5 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{color:"white", fontFamily: "'Diagond', sans-serif"}}>Current Balance</Typography>
                        <CurrentBalance />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{borderRadius:8, backgroundColor:"#555555", width: "25vw", padding: 2, textAlign: "center", boxShadow: 5}}>
                    <CardContent sx={{fontFamily: "'Diagond', sans-serif" }}>
                        <Typography variant="h6" sx={{color:"white", fontFamily: "'Diagond', sans-serif" }}>Most Expensive Purchase</Typography>
                        <MostExpensivePurchase />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserBalanceMostExpensiveGrid;