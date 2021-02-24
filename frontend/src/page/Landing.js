import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group'
// import { useInterval } from '../utils/customHooks';

import OrderForm from '../component/orderForm/OrderForm';

import './Landing.scss';

const Landing = () => {

    var titleText = "IT'S CHOW TIME AT GREEN TOMATO";
    // var navbarText = [
    //     "ORDER",
    //     "MENU",
    //     "PAYME",
    // ];
    var [logoText, setLogoText] = useState('');
    // var [navText, setNavText] = useState('');
    var [startLogoAnimation, setStartLogoAnimation] = useState(false);
    var [logoAnimationDone, setLogoAnimationDone] = useState(false);
    // var [titleAnimationDone, setTitleAnimationDone] = useState(false);
    var [showContent, setShowContent] = useState(false);
    var [landingAnimationDone, setLandingAnimationDone] = useState(false);
      
    const logoTransitionStyles = {
        entering: {
            top: '50%',
            transform: 'translateY(-50%)',
        },
        entered:  {
            top: '0',
            transform: 'translateY(0)',
        },
        exiting:  { top: '50%' },
        exited:   { top: '50%' },
    };

    const navBarRef = useRef(null);

    // Start initial logo animation
    useEffect(() => {
        setStartLogoAnimation(true);
        setTimeout(() => {
            setLogoAnimationDone(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (logoAnimationDone) {
            if (logoText.length < titleText.length) {
                setTimeout(() => {
                    setLogoText(logoText.concat(titleText.substring(logoText.length, logoText.length + 1)));
                }, 30);
            }
            if (logoText.length > 5) {
            }
        }
    }, [logoText, logoAnimationDone])

    useEffect(() => {
        showContent && setTimeout(() => {
            setLandingAnimationDone(true);
        }, 300)
    }, [showContent])

    // const wheelTransitionStyles = {
    //     entering: { opacity: 0 },
    //     entered:  { opacity: 1 },
    //     exiting:  { opacity: 1 },
    //     exited:   { opacity: 0 },
    // }

    return (
        <>
            <div className='landing-container'>
                <div className='landing-bg-container'></div>
                <Transition in={startLogoAnimation} timeout={500}>
                    {state => (
                    <div className='landing-logo-container' style={{
                            ...logoTransitionStyles[state]
                        }}>
                        <svg className='gt-logo' viewBox="0 0 1000 1000">
                                    <path className="st0" d="M710.4,214.5c-22.2,21.7-23,57.2-1.6,79.7C842.4,435.3,836.4,658,695.4,791.7c-64.1,60.7-148.6,95.1-236.9,96.4 c-194.3-2.7-349.7-162.4-347-356.8c1.2-88,35.4-172.4,95.8-236.5c21.2-22.6,20.3-58.1-2-79.7c-22-21.2-57-20.6-78.2,1.4 c-0.2,0.2-0.4,0.4-0.6,0.6C-49.6,404.1-40.8,698.3,146.1,874.4c84.6,79.7,196.1,124.9,312.4,126.5 c256.7-3.7,461.8-214.9,458.1-471.6c-1.7-116.7-47.2-228.4-127.5-313.1c-20.9-22.2-55.8-23.2-78-2.4 C710.9,214,710.6,214.2,710.4,214.5z"></path>
                                    <path className="st0" d="M399.7,57.5v385.4c-1.5,30.8,22.2,57,53,58.5s57-22.2,58.5-53c0.1-1.8,0.1-3.7,0-5.5V57.5 c1.5-30.8-22.2-57-53-58.5c-30.8-1.5-57,22.2-58.5,53C399.6,53.9,399.6,55.7,399.7,57.5z"></path>
                                    <path className="st0" d="M635.9,201.3c13.1-7.5,25.3-16.2,36.7-26.2c19.4-16.9,25.9-32.8,72.5-27c46.7,5.8,91.2,17.4,133.4-0.8 S962.2,78,962.2,78c-24.1,21.2-55.6,32.2-87.6,30.6c-16.8-0.1-33.6-2.3-49.9-6.5c-49.4-16-103.6-3.2-140.6,33.2 c-8.9,11.2-16.7,23.3-23.2,36.1C656.3,184,647.5,194.6,635.9,201.3z"></path>
                                    <path className="st0" d="M677.7,113.1c0,0,34-69.7,94.4-80.9c25.1-5,51.1-0.8,73.4,11.9c22.1,7.2,45.2,10.7,68.5,10.4 c30.2-1.2,59.7-9.6,86-24.4c0,0-20.2,25.5-96.5,52.9c-13.5,5.1-27.8,7.5-42.2,6.9c-27,0-53.9-9.7-76.6-10.1S723.7,72.6,677.7,113.1z "></path>
                                </svg>
                        <h1>{logoText}</h1>
                    </div>
                    )}
                </Transition>
                <div className='landing-nav-container' ref={navBarRef}>
                    <button className="landing-nav-items" onClick={() => setShowContent(true)}>ORDER</button>
                    <button className="landing-nav-items">MENU</button>
                    <button className="landing-nav-items">PAYME</button>
                </div>
                <Transition in={landingAnimationDone} timeout={100}>
                    {state => (
                        <div className='wheel-controller'>
                            <OrderForm></OrderForm>
                        </div>
                    )}
                </Transition>
            </div>
        </>
    )
}

export default Landing;