"use client";

// import { useState } from "react";
import ChartLineSample from ".";
// import Button from "../../../_components/Button";
// import { sampleChartData } from "./config";

// ChartData[]
interface ChartDataResponse {
  messageCount: number,
  month: number,
  year: number,
  status: string
}
 interface ChartLineSampleComponentBlockProps {
  dataResponse: ChartDataResponse[] | undefined;
}



const ChartLineSampleComponentBlock: React.FC<ChartLineSampleComponentBlockProps> = ({dataResponse}) => {



  const months = Array.from({length: 12}, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', {month: 'long'})
  });

  const deliveredData: number[] = Array(months.length).fill(0);
  const pendingData: number[] = Array(months.length).fill(0);

  for (let index = 0; index < months.length; index++) {
    
    const currentMonth = index+1;

    dataResponse?.forEach((item)=>{
      if(item.month == currentMonth && item.status == 'DELIVERED'){
        deliveredData[index] = item.messageCount;
      }

      if(item.month == currentMonth && item.status == 'PENDING'){
        pendingData[index] = item.messageCount;
      }
    })
     
  }




  return (
    <>
      {dataResponse && <ChartLineSample data={{
        labels: months,
        datasets: [
          {
          label: 'Pending Messages',
          data: pendingData,
          fill: false,
          borderColor: 'rgb(251, 146, 60)', // Orange for pending
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: 'rgb(251, 146, 60)',
          pointBorderColor: 'rgb(251, 146, 60)',
        },
        {
          label: 'Delivered Messages',
          data: deliveredData,
          fill: false,
          borderColor: 'rgb(34, 197, 94)', // Green for delivered
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: 'rgb(34, 197, 94)',
          pointBorderColor: 'rgb(34, 197, 94)',
        },
      ]
      }} />}
    </>
  );
}

export default ChartLineSampleComponentBlock
