import React from 'react'
import styledComponents from 'styled-components'
import Service from './Service';

const ServicesGrid = styledComponents.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-height: calc(100vh - 179px);
    overflow: auto;
    gap: 20px;
    padding: 30px 0;
`;
export default function Services({ data }) {
    return (
        <ServicesGrid>
            {
                data.map((service, idx) => {
                    return (
                        <Service key={idx} service={service} />
                    )
                })
            }
        </ServicesGrid>
    )
}
