import React, {useEffect, useState } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react'
import BarGraphs from './BarGraph';
import PieGraph from './PieGraph';

const Charts = ({ langData, repoData }) => {
  const [activeItem, setactiveItem] = useState('bar');
  const [langChartData, setLangChartData] = useState('');
  const [langChartlabel, setLangChartlabel] = useState('');
  const [langChartbackgroundColor, setLangChartbackgroundColor] = useState('');
  const [langChartborderColor, setLangChartborderColor] = useState('');

    const handleItemClick = (e, { name }) => {
       setactiveItem(name)
  }
    const initLangChart = () => {
      setLangChartlabel(langData.map(lang => lang.label))
      const data = langData.map(lang => lang.value);
      setLangChartData(data);

    if (data.length > 0) {
      setLangChartbackgroundColor(langData.map(
        ({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`,
      ))
      setLangChartborderColor(langData.map(lang => `${lang.color}`))
      const axes = false;
      const legend = true;
    }
  };
    useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      // initStarChart();
      // initThirdChart();
    }
  }, []);
      return (
            <div>
     <div className="menu">
        <Menu attached='top' tabular>
          <Menu.Item
            name='bar'
            active={activeItem === 'bar'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='pie'
            active={activeItem === 'pie'}
            onClick={handleItemClick}
          />
        </Menu>
            </div>
          {activeItem === 'bar' ? <BarGraphs /> : <PieGraph
            data={langChartData}
            langChartlabel={langChartlabel}
            langChartbackgroundColor={langChartbackgroundColor}
            langChartborderColor={langChartborderColor}
          />}
    </div>
         );
}
 
export default Charts;
