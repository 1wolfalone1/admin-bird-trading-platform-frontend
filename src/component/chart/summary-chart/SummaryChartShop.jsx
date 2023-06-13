import { ResponsiveBar } from "@nivo/bar";
import { data } from "./mock.js";

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
   axis: {
      fontSize: "14px",
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
export default function SummaryChartShop() {
   return (
      <ResponsiveBar
         data={data}
         theme={themes}
         legends={legends}
         keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
         indexBy="country"
         margin={{ top: 10, right: 80, bottom: 30, left: 50 }}
         padding={0.3}
         valueScale={{ type: "linear" }}
         indexScale={{ type: "band", round: true }}
         colors={{ scheme: "red_yellow_green" }}
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
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
         }}
         axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40,
         }}
         labelSkipWidth={12}
         labelSkipHeight={12}
         labelTextColor="#ffffff"
         role="application"
         ariaLabel="Nivo bar chart demo"
         barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
         }
      />
   );
}
