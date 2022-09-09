import { Chart } from '@antv/g2';
import { useEffect } from 'react';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

export const Home = () => {

  useEffect(() => {
    const chart = new Chart({
      container: 'container',
      width: 600,
      height: 300,
    });

    chart.interval() // Create an interval mark and add it to the chart.
      .data(data) // Bind data for this mark.
      .encode('x', 'genre') // Assign genre column to x position channel.
      .encode('y', 'sold'); // Assign sold column to y position channel.

      chart.render();
  }, [])

  return (
    <div id="container"></div>
  )
}
