import React from 'react';

class testpage extends React.Component {
    state = {
        animated: '',
    };
    enter = () => {
        this.setState({ animated: 'hinge' });
    };
    render() {
        return (
           <div>
               测试页面
           </div>
        );
    }
}

export default testpage;