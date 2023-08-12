import React from 'react';
import Section from '../Section/Section';
import TwoColumns from '../TwoColumns/TwoColumns';
import TimelineBar from '../TimelineBar/TimelineBar';

function AboutProject() {
    const headering = 'О проекте';
    const title01 = 'Дипломный проект включал 5 этапов';
    const title02 = 'На выполнение диплома ушло 5 недель';
    const paragraph01 = 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.';
    const paragraph02 = 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'
    const timelineTitle01 = '1 неделя';
    const timelineTitle02 = '4 недели';
    const timelineSubTitle01 = 'Back-end';
    const timelineSubTitle02 = 'Front-end';

    return (
        <Section sectionName="about-project" id="about-project" headering={headering} >
            <TwoColumns title01={title01} title02={title02} paragraph01={paragraph01} paragraph02={paragraph02} />
            <TimelineBar title01={timelineTitle01} title02={timelineTitle02} subTitle01={timelineSubTitle01} subTitle02={timelineSubTitle02} />
        </Section>
    );
}

export default AboutProject;
