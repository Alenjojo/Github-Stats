import React, {Component} from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react'
import BarGraphs from './BarGraph';
import PieGraph from './PieGraph';
class Charts extends Component {
      state = { activeItem: 'bar' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name }
   )
    render() {
        const { activeItem } = this.state

        return (
            <div>
     <div className="menu">
        <Menu attached='top' tabular>
          <Menu.Item
            name='bar'
            active={activeItem === 'bar'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='pie'
            active={activeItem === 'pie'}
            onClick={this.handleItemClick}
          />
        </Menu>
            </div>
            {activeItem === 'bar' ? <BarGraphs /> : <PieGraph />}
    </div>
         );
    }

}
 
export default Charts;
