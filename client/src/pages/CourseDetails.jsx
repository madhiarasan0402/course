import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg-edu.jpg';

const CourseDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState(location.state?.course || null);
    const [loading, setLoading] = useState(!course);
    const contentRef = useRef(null);

    const scrollToContent = () => {
        if (contentRef.current) {
            contentRef.current.scrollBy({ top: contentRef.current.clientHeight * 0.8, behavior: 'smooth' });
        }
    };

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (!course) {
            const fetchCourse = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
                    setCourse(res.data);
                } catch (err) {
                    console.error("Error fetching course details", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCourse();
        }
    }, [id, course]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Course Details...</div>;

    if (!course) return <div className="min-h-screen flex items-center justify-center text-white">Course not found.</div>;

    const pageBackground = {
        backgroundColor: "#0f172a",
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
    };

    return (
        <div className="min-h-screen relative text-white" style={pageBackground}>
            <button
                onClick={() => navigate(-1)}
                className="fixed top-6 left-6 z-50 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/10 transition flex items-center gap-2"
            >
                ← Back
            </button>

            <div className="container mx-auto px-4 py-20 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-12 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4">
                            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {course.course_code}
                            </h1>
                            <span className="text-2xl text-primary font-light">{course.course_name}</span>
                        </div>
                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{course.description}</p>
                    </div>

                    {/* Main Content Layout */}
                    <div className="flex flex-col gap-10 py-8">

                        {/* 1. Introduction / Overview */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Course Overview</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {course.description}
                                <br /><br />
                                This course is designed to provide comprehensive knowledge and practical skills in the field of {course.course_name}. It covers foundational theories, modern applications, and industry-standard practices.
                            </p>
                        </div>

                        {/* 2. Scope */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Scope & Opportunities</h3>
                            </div>
                            <div className="pl-2 border-l-4 border-blue-500/50">
                                <p className="text-gray-200 leading-relaxed text-lg mb-4 font-medium pl-4">
                                    {course.scope}
                                </p>
                                <p className="text-gray-400 pl-4">
                                    Graduates can expect diverse career paths in both public and private sectors, ranging from research and development to implementation and management roles globally.
                                </p>
                            </div>
                        </div>

                        {/* 3. Benefits */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Key Benefits</h3>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-lg">
                                {course.benefits?.split(',').map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-purple-500 shrink-0"></span>
                                        {benefit.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. Core Competencies */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.25 4.533A9.707 9.707 0 006 3.75a9.753 9.753 0 00-3.25 5.747 9.753 9.753 0 003.25 5.747 9.707 9.707 0 005.25-.783 9.707 9.707 0 005.25.783 9.753 9.753 0 003.25-5.747 9.753 9.753 0 00-3.25-5.747 9.707 9.707 0 00-5.25.783zM12 6.14a8.216 8.216 0 01-5.25-.664 8.243 8.243 0 01-2.479 4.024 8.243 8.243 0 012.48 4.024 8.216 8.216 0 015.25-.664 8.216 8.216 0 015.25.664 8.243 8.243 0 012.479-4.024 8.243 8.243 0 01-2.48-4.024 8.217 8.217 0 01-5.25.664z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Core Competencies</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {course.keywords?.split(/(?:,| )+/).filter(k => k).map(tag => (
                                    <span key={tag} className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-lg text-gray-200">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 5. Roadmap */}
                        <div className="pt-8">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M11.25 4.533A9.707 9.707 0 006 3.75a9.753 9.753 0 00-3.25 5.747 9.753 9.753 0 003.25 5.747 9.707 9.707 0 005.25-.783 9.707 9.707 0 005.25.783 9.753 9.753 0 003.25-5.747 9.753 9.753 0 00-3.25-5.747 9.707 9.707 0 00-5.25.783z" />
                                        <path d="M11.644 14.5a.75.75 0 0 1 .655.373l1.5 2.5a.75.75 0 0 1-1.286.772l-1.026-1.71-1.025 1.71a.75.75 0 0 1-1.286-.772l1.5-2.5a.75.75 0 0 1 .655-.373Z" />
                                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v.754a9.707 9.707 0 0 1 5.25.783 9.753 9.753 0 0 1 3.25 5.747 9.707 9.707 0 0 1-.783 5.25A9.753 9.753 0 0 1 14.72 18.75h4.53a.75.75 0 0 1 0 1.5h-5.25a.75.75 0 0 1 0-1.5h.58a8.216 8.216 0 0 0 5.25-.664 8.243 8.243 0 0 0 2.479-4.024 8.216 8.216 0 0 0-.664-5.25 8.243 8.243 0 0 0-4.024-2.48 8.216 8.216 0 0 0-5.25.664 8.243 8.243 0 0 0-2.48 4.024 8.216 8.216 0 0 0 .664 5.25 8.243 8.243 0 0 0 4.024 2.48h.58a.75.75 0 0 1 0 1.5h-5.25a.75.75 0 0 1 0-1.5h4.53a9.753 9.753 0 0 1-5.747-3.25A9.707 9.707 0 0 1 3.75 12.75 9.753 9.753 0 0 1 7 7a9.707 9.707 0 0 1 5-2.25V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Curriculum Roadmap</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={contentRef}>
                                {course.roadmap?.split(/, ?(?=Sem)/).map((sem, i) => {
                                    const parts = sem.split(':');
                                    // parts[0] is "Sem 1", parts[1] is "Subject Name"
                                    const content = parts[1]?.trim();

                                    if (!content) return null;

                                    return (
                                        <div key={i} className="group glass-panel p-8 hover:bg-white/10 transition border border-white/5 hover:border-primary/50 relative overflow-hidden rounded-xl flex items-center justify-center min-h-[150px]">
                                            <div className="relative z-10 text-center">
                                                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors tracking-wide">
                                                    {content}
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={scrollUp}
                            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
                        >
                            Scroll to Top
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default CourseDetails;
