import { observable, computed, action, autorun } from 'mobx';
import audio from './audio';
import { Welcome } from './events';
import React from 'react';

export const GENDER_MALE = 'GENDER_MALE';
export const GENDER_FEMALE = 'GENDER_FEMALE';

function lerp(start, end, i) {
    return start + (end - start) * i;
}

export class Horse {
    @observable speed = 0;
    @computed get speedKPH() {
        return this.speed * 48;
    }
    @computed get isMoving() {
        return !!this.speed;
    }
    @observable temp = 0;
    @computed get tempCelsius() {
        return lerp(37, 38, this.temp); // 37-38 normal 41= denger
    }
    @observable energy = 1;
    @observable asleep = false;
    @observable time = 0;
    @computed get clock() {
        const minutes = (this.time % 60).toString().padStart(2, '0');
        const hours = ((0|this.time / 60) % 24).toString().padStart(2, '0');
        return `${hours}:${minutes}`
    };

    @observable name = 'doris';
    @observable alive = true;
    @observable gumHealth = 0; // mucus membranes 0-100 (colour)
    @observable breathingRate = 15; // 10-24
    @observable hydration = 1
    @observable bloodRefill = 1000; // 2000ms or less

    @observable stomach = {
        food: 20,
        water: 10,
    }; // water / food
    @computed get fullness() {
        const { food, water } = this.stomach;
        return food + water;
    }
    @computed get isFull() {
        return this.fullness >= 100;
    }
    @computed get canIngest() {
        return !this.isFull && !this.isMoving;
    }

    @observable gender = GENDER_MALE;

    @observable backgroundOffset = 0;

    @computed get heartRate() {// 28-44 bpm 28-220 non resting
        return lerp(28, 220, this.speed);
    }

    @observable event = false;

    @computed get isRunning() {
        return this.event !== false;
    }

    // action
    @action wee = () => {
        if (this.stomach.water <= 0) return;
        this.stomach.water = 0;
        audio.wee();
    };
    @action poo = () => {
        if (this.stomach.food <= 0) return;
        this.stomach.food = 0;
        audio.poo();
    }
    @action speedUp = () => {
        if (this.asleep) return;
        this.speed = Math.min(1, this.speed += 0.1);
    };
    @action slowDown = () => {
        if (this.asleep) return;
        this.speed = Math.max(0, this.speed -= 0.1);
    };
    @action eat = () => {
        this.stomach.food = this.stomach.food + 5;
        audio.eating();
    };
    @action drink = () => {
        this.stomach.water = this.stomach.water + 5;
        audio.drinking();
    };

    constructor() {
        const loop = () => {
            requestAnimationFrame(loop);
            if (!this.isRunning) return;
            const newOffset = this.backgroundOffset + (this.speedKPH / 5);
            this.backgroundOffset = newOffset;
        };
        loop();
        const heartLoop = () => {
            const interval = 60000 / this.heartRate;
            setTimeout(heartLoop, interval);
            if (!this.isRunning) return;
            console.info('boop', this.heartRate);
            if (this.asleep && this.energy >= 1) {
                this.asleep = false;
            }
            else if (this.asleep) {
                this.energy = Math.max(0, this.energy + 0.01)
            }
            else {
                this.energy = Math.max(0, this.energy - 0.001 - (this.speed / 100))
            }
        };
        heartLoop();
        setInterval(() => {
            if (!this.isRunning) return;
            this.time += 1;
        }, 5000);

        autorun(() => {
            if (this.energy === 0) {
                this.asleep = true;
                this.speed = 0;
            }
        });

        this.event = <Welcome />;
    }
}

export default new Horse();
