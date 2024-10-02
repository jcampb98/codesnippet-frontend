import { Link } from 'react-router-dom';
import '../../styles/home-content/HomeContent.css';

function HomeContent() {
    return(
        <div>
            <div className='content'>
                <div className='content-container'>
                    <h1 className='content-header'>Share Code. Simplify Collaboration</h1>
                    <p className='content-body'>
                        Easily share, store, and collaborate on code snippets with your team. 
                        No more cluttered chat messages-just clean, organized, and searchable code sharing.
                    </p>
                    <button className='get-started-btn' role='button'>
                        <Link to="/register">Get Started</Link>
                    </button>
                </div>
                <div className='content-image-container'>
                    <img className='content-image' src='../my_code_snippets.svg' alt='an illustration of a mobile phone with code snippets' />
                </div>
            </div>
            <section className='content-section-container'>
                <h1 className='content-section-header'>Why Choose CodeSnippets?</h1>
                <p className='content-section-description'>
                    Unlock a more efficient way to share, organize, and collaborate on code.
                    Designed for teams who value productivity and seamless communication.
                </p>
                <div className='section-content-list'>
                    <div className='section-content-item'>
                        <img className='content-item-icon' src='../coding.png' />
                        <h2 className='content-item-header'>Organized Code Sharing</h2>
                        <p className='content-item-body'>
                            Stop losing important code in endless chat threads. 
                            Save, organize and find code snippets easily—keeping your team on the same page.
                        </p>
                    </div>
                    <div className='section-content-item'>
                        <img className='content-item-icon' src='../team.png' />
                        <h2 className='content-item-header'>Boost Team Productivity</h2>
                        <p className='content-item-body'>
                            Instantly share snippets with your team, speeding up development and reducing repetitive work. 
                            No more digging through Slack or Teams.
                        </p>
                    </div>
                    <div className='section-content-item'>
                        <img className='content-item-icon' src='../search-code.png' />
                        <h2 className='content-item-header'>Searchable & Discoverable</h2>
                        <p className='content-item-body'>
                            Find exactly what you're looking for with powerful search. 
                            Access not only your own code snippets but also quick and easy solutions by other developers in the community.
                        </p>
                    </div>
                    <div className='section-content-item'>
                        <img className='content-item-icon' src='../security.png' />
                        <h2 className='content-item-header'>Secure & Collaborative</h2>
                        <p className='content-item-body'>
                            Share code safely within your team and collaborate in real time. 
                            CodeSnippets keeps your code secure while promoting teamwork.
                        </p>
                    </div>
                </div>
            </section>
            <section className='how-it-works'>
                <h1 className='step-header'>How CodeSnippets Works in 3 Steps</h1>
                <div className='steps'>
                    <div className='step'>
                        <h3 className='step-title'>1. Sign Up</h3>
                        <p className='step-description'>
                            Create a free account to start sharing and collaborating on code.
                        </p>
                    </div>

                    <div className='arrow-container'>
                        <img className='arrow-icon' src='../right-arrow.png' alt='Icon of a Right Arrow' />
                    </div>

                    <div className='step'>
                        <h3 className='step-title'>2. Create Snippets</h3>
                        <p className='step-description'>
                            Save important code snippets and organize them in the dashboard.
                        </p>
                    </div>

                    <div className='arrow-container'>
                        <img className='arrow-icon' src='../right-arrow.png' alt='Icon of a Right Arrow' />
                    </div>

                    <div className='step'>
                        <h3 className='step-title'>3. Collaborate</h3>
                        <p className='step-description'>
                            Easily share your snippet with other developers via a link. 
                            Allow them to view, use, or contribute to the codebase seamlessly.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeContent;