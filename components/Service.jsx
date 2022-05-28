import React, {useState} from 'react'
import styledComponents from 'styled-components'
import { colors, fonts, styles } from 'theme';
import { average } from 'color.js'
import Avatar from './custom/Avatar';


const ServiceItem = styledComponents.div`
    background-color: ${colors.secondary};
    box-shadow: ${styles.boxShadow.md};
    display: flex;
    flex-direction: column;
    border-radius: ${styles.borderRadius.md};
    overflow: hidden;
    .service-img {
        position: relative;
        width: 100%;
        min-height: 250px;
        max-height: 250px;
        background-color: ${props => props.color};
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .service-price {
            position: absolute;
            top: 100%;
            right: 20px;
            transform: translateY(-50%);
            font-size: ${fonts.sizes.md};
            font-weight: ${fonts.weights.bold};
            padding: ${styles.paddings.sm} ${styles.paddings.md};
            background-color: ${colors.primary};
            backdrop: filter(3px);
            border-radius: ${styles.borderRadius.sm};
            color: ${colors.secondary};
        }
    }
    .service-info {
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .service-meta {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        .service-title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: ${fonts.sizes.xl};
            font-weight: ${fonts.weights.bold};
        }
    }
    .seller-meta {
        .seller-profile {
            display: flex;
            align-items: center;
            gap: 10px;
            .seller-avatar {
                width: 30px;
                height: 30px;
                overflow: hidden;
                border-radius: ${styles.borderRadius.md};
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .seller-name {
                .name {
                    font-size: ${fonts.sizes.lg};
                    font-weight: ${fonts.weights.medium};
                }
                .username {
                    font-size: ${fonts.sizes.md};
                    color: ${colors.layerText};
                }
            }
        }
    }
`;
function Service({ service }) {
    const [backgroundColor, setBackgroundColor] = useState('');
    average(service.photoURL, { amount: 1, format: 'hex' }).then(colors => {
        setBackgroundColor(colors)
    })
    return (
        <ServiceItem color={backgroundColor}>
            <div className="service-img">
                <img src={service.photoURL} alt="" />
                <div className="service-price">
                    Rs. 2900
                </div>
            </div>
            <div className="service-info">
                <div className="service-meta">
                    <div className="service-title">{service.title}</div>
                </div>
                <div className="seller-meta">
                    <div className="seller-profile">
                        <div className="seller-avatar">
                            <Avatar width={30} height={30} src="Anirudha"  />
                        </div>
                        <div className="seller-name">
                            <div className="name">
                                Anirudha Gandhare
                            </div>
                            <div className="username">
                                @anirudhag
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ServiceItem>
    )
}

export default Service