import { ResponsiveBar } from "@nivo/bar";
import {data } from './mock'
import React from "react";
import theme from "../../../style/theme.js";
const legends = [
   {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      itemTextColor: "#ffffff",
      symbolSize: 20,
      effects: [
         {
            on: "hover",
            style: {
               itemOpacity: 1,
            },
         },
      ],
   },
];
const themes = {
   fontSize: '8px',
   axis: {
      fontSize: "10px",
      tickColor: "#eee",
      ticks: {
         line: {
            stroke: "#555555",
         },
         text: {
            fill: "#97ff57",
         },
      },
      legend: {
         text: {
            fill: "#ffffff",
         },
      },
      domain: {
         text: {
            fill: "#ffffff",
         },
      },
      keys: {
         text: {
            fill: "#ffffff",
         },
      },
   },
   grid: {
      line: {
         stroke: "#555555",
      },
   },
};
export default function SummaryChartShop({data}) {
   console.log(data, '------data------------------------------------');
   return (
     <>
      {data ? (
          <ResponsiveBar
          data={data}
          theme={themes}
          legends={legends}
          keys={['birds', 'foods', 'accessories']}
          indexBy="date"
          margin={{ top: 10, right: 80, bottom: 30, left: 50 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          
          defs={[
             {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
             },
             {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
             },
          ]}
          fill={[
             {
                match: {
                   id: "fries",
                },
                id: "dots",
             },
             {
                match: {
                   id: "sandwich",
                },
                id: "lines",
             },
          ]}
          borderColor={{
             from: "color",
             modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
             tickSize: 5,
             tickPadding: 5,
             tickRotation: 0,
             legend: "day in week",
             legendPosition: "middle",
             legendOffset: 32,
          }}
          axisLeft={{
             tickSize: 5,
             tickPadding: 5,
             tickRotation: 0,
             legend: "category",
             legendPosition: "middle",
             legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#000000"
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
             e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
       />
      ) : ''}
     </>
   );
}
