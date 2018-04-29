import React, { Component } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import './styles/index.scss';
import horse from './state';

@observer
export class Root extends Component {

    render() {

        return <main style={{
            backgroundPosition: horse.backgroundOffset,
        }}>
            {horse.event}
            <div className="clock">
                {horse.clock}
            </div>
            <div className="menu">
                <button onClick={horse.speedUp}>speedUp</button>
                <button onClick={horse.slowDown}>slowDown</button>
                <button onClick={horse.eat} disabled={!horse.canIngest}>
                    eat some hay
                </button>
                <button onClick={horse.drink} disabled={!horse.canIngest}>
                    drink some horse water
                </button>
                <button onClick={horse.wee}>do a wee</button>
                <button onClick={horse.poo}>do a poo</button>
                {horse.asleep && (
                    <span>the horse is fallen asleep</span>
                )}
            </div>
            <div className="horse">
                <img src="/img/horse.png" style={{
                    filter: `grayscale(${horse.asleep ? '100%' : '0%'})`
                }} />
            </div>
            <pre className="debug">
                {JSON.stringify(toJS(horse), null, 4)}
            </pre>
        </main>;
    }

}

render(<Root/>, document.body.appendChild(document.createElement('div')));
