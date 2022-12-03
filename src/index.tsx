import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
    title: string;
}

const App = (props: AppProps) => <h2>{props.title}</h2>;

ReactDOM.render(
    <App title="Voronogo diagram coming soon" />,
    document.getElementById('root')
);
