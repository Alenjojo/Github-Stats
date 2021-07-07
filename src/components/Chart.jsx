import React, {useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react'
import BarGraphs from '../utils/BarGraph';
import PieGraph from '../utils/PieGraph';
import langColors from '../utils/langColors';

const Charts = ({ langData, repoData }) => {
  const [activeItem, setactiveItem] = useState('Doughnut');

  const [langChartData, setLangChartData] = useState('');
  const [langChartlabel, setLangChartlabel] = useState('');
  const [langChartbackgroundColor, setLangChartbackgroundColor] = useState('');
  const [langChartborderColor, setLangChartborderColor] = useState('');

  const [langChartDatabar, setLangChartDatabar] = useState('');
  const [langChartlabelbar, setLangChartlabelbar] = useState('');
  const [langChartbackgroundColorbar, setLangChartbackgroundColorbar] = useState('');
  const [langChartborderColorbar, setLangChartborderColorbar] = useState('');
    const handleItemClick = (e, { name }) => {
       setactiveItem(name)
  }
  //to create most used language || Doughnut
    const initLangChart = () => {
      setLangChartlabel(langData.map(lang => lang.label))
      const data = langData.map(lang => lang.value);
      setLangChartData(data);

    if (data.length > 0) {
      setLangChartbackgroundColor(langData.map(
        ({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`,
      ))
      setLangChartborderColor(langData.map(lang => `${lang.color}`))
      // const axes = false;
      // const legend = true;
      // const config = { langChartData, langChartlabel, langChartbackgroundColor, langChartborderColor};
      // PieGraph(config);
    }
  };
//to create most stared by language  || Bar graph
  const [thirdChartData, setThirdChartData] = useState(null);
  const initThirdChart = () => {
    const filteredRepos = repoData.filter(repo => !repo.fork && repo.stargazers_count > 0);
    const uniqueLangs = new Set(filteredRepos.map(repo => repo.language));
    const labels = Array.from(uniqueLangs.values()).filter(l => l);
    setLangChartlabelbar(labels);
    const data = labels.map(lang => {
      const repos = filteredRepos.filter(repo => repo.language === lang);
      const starsArr = repos.map(r => r.stargazers_count);
      const starSum = starsArr.reduce((a, b) => a + b, 0);
      return starSum;
    });
    setLangChartDatabar(data);

    setThirdChartData(data);

    if (data.length > 0) {
      const borderColor = labels.map(label => langColors[label]);
      setLangChartbackgroundColorbar(borderColor);
      const backgroundColor = borderColor.map(color => `${color}B3`);
      setLangChartborderColorbar(backgroundColor);
     // const config = { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend };
    }
  };
    useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      // initStarChart();
      initThirdChart();
    }
  }, []);
      return (
            <div>
     <div className="menu">
        <Menu attached='top' tabular>
          <Menu.Item
            name='Doughnut'
            active={activeItem === 'Doughnut'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Bar'
            active={activeItem === 'Bar'}
            onClick={handleItemClick}
          />
        </Menu>
            </div>
          {activeItem === 'Doughnut' ? <PieGraph
            data={langChartData}
            langChartlabel={langChartlabel}
            langChartbackgroundColor={langChartbackgroundColor}
            langChartborderColor={langChartborderColor}
          /> : <BarGraphs
            data={langChartDatabar}
            langChartlabel={langChartlabelbar}
            langChartbackgroundColor={langChartbackgroundColorbar}
            langChartborderColor={langChartborderColorbar}
          />}
    </div>
         );
}
 
export default Charts;
