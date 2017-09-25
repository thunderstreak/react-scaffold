import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';



// 定义要挂载的 DOM 节点
const MountNode = document.getElementById('app');

const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,
        MountNode
    )
}

// 初始化调用
render(App);

// 配置需要热模块替换的条件
if (module.hot && process.env.NODE_ENV !== 'production') {
    // 处理对特定依赖的更改
    module.hot.accept('./components/App', (err) => {
        if (err) {
            console.log(err);
        }
        // 从DOM 中移除已经挂载的 React 组件 然后重装
        ReactDOM.unmountComponentAtNode(MountNode);
        render(App);
    });
}
