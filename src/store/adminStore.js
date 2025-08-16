import { create } from 'zustand';

export const BACKEND_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

const adminStore = create((set) => ({
    instituteData: [],
    socialLinks: [],
    testimonial: [],
    tutorialSections: [],
    tutorials: [],
    tutorialChapters: [],
    courses: [],
    courseTopics: [],
    upcomingBatches: [],
    batchLength:null,
    isUpdateLoading: false,
    isAddSocialLinkLoading: false,
    isTestimonialAddedLoading: false,
    isUploadSection: false,
    addTutorialLoader: false,
    addChapterLoader: false,
    addCourseLoader: false,
    addChapterSubmit: false,
    addTopicSubmit: false,
    addSubChapterSubmit: false,
    addSubTopicSubmit: false,
    addUpcomingBatchLoader: false,
    addCourseTopicLoader: false,
    addSubTopicLoader: false,
    selectTopCourseLoader: false,
    setAddChapterSubmit: () => set((state) => ({ addChapterSubmit: !state.addChapterSubmit })),
    setAddSubChapterSubmit: () => set((state) => ({ addSubChapterSubmit: !state.addSubChapterSubmit })),
    setAddTopicSubmit: () => set((state) => ({ addTopicSubmit: !state.addTopicSubmit })),
    setAddSubTopicSubmit: () => set((state) => ({ addSubTopicSubmit: !state.addSubTopicSubmit })),

    //institute-data
    getInstituteData: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getInstituteInfo/${id}`);
            const result = await response.json();
            set({ instituteData: result.companyInfo });
        } catch (error) {
            console.error(error.message);
        }
    },
    updateInstituteData: async (id, data) => {
        set({ isUpdateLoading: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/updateInstituteInfo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            await new Promise(resolve => setTimeout(resolve, 200));

            set({ isUpdateLoading: false });
        } catch (error) {
            console.warn(error.message);
            set({ isUpdateLoading: false });
        }
    },
    addSocialLinks: async (data, id) => {
        set({ isAddSocialLinkLoading: true })
        try {
            const response = await fetch(`${BACKEND_API_URL}/addSocialInfo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));

            set({ isAddSocialLinkLoading: false })
        } catch (error) {
            console.warn(error.message);
            set({ isAddSocialLinkLoading: false });
        }
    },
    getSocialLinks: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getSocialInfo/${id}`);
            const result = await response.json();
            set({ socialLinks: result.socialLinks });
        } catch (error) {
            console.log(error.message);
        }
    },

    //testimonials
    addTestimonial: async (data) => {
        set({ isTestimonialAddedLoading: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addTestimonial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));

            set({ isTestimonialAddedLoading: false });
        } catch (error) {
            console.error(error.message);
            set({ isTestimonialAddedLoading: false });
        }
    },

    //tutorials
    addTutorialSection: async (data) => {
        set({ isUploadSection: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addTutorialSection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));

            set({ isUploadSection: false });
        } catch (error) {
            console.error(error.message);
            set({ isUploadSection: false });
        }
    },
    getTutorialSections: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getTutorialSection/${id}`);
            const result = await response.json();

            set({ tutorialSections: result.tutorialSections })
        } catch (error) {
            console.error(error.message);
        }
    },
    addTutorials: async (data) => {
        set({ addTutorialLoader: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addTutorial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));
            set({ addTutorialLoader: false });
        } catch (error) {
            console.error(error.message);
            set({ addTutorialLoader: false });
        }
    },
    getTutorials: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getTutorials/${id}`);
            const result = await response.json();
            set({ tutorials: result.tutorials });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteTutorials: async (id) => {
        try {
            await fetch(`${BACKEND_API_URL}/deleteTutorials/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    addTutorialChapter: async (data) => {
        set({ addChapterLoader: false });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addTutorialChapter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));
            set({ addChapterLoader: false });
        } catch (error) {
            console.error(error.message);
        }
    },
    getTutorialChapter: async (instituteId) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getChapterInfo/${instituteId}`);
            const result = await response.json();
            set({ tutorialChapters: result.chapterInfo });
        } catch (error) {
            console.error(error.message);
        }
    },
    editChapter: async (id, data) => {
        try {
            await fetch(`${BACKEND_API_URL}/editChapter/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteChapter: async (id) => {
        try {
            await fetch(`${BACKEND_API_URL}/deleteChapter/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    addSubChapter: async (id, data) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/addSubChapter/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteSubChapter: async (id, data) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/deleteSubChapter/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error.message);
        }
    },

    //course
    addCourse: async (data) => {
        set({ addCourseLoader: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addCourse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 200));
            set({ addCourseLoader: false });
        } catch (error) {
            console.error(error.message);
        }
    },
    getAllCourses: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getCourses/${id}`);
            const result = await response.json();
            set({ courses: result.courses });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteCourse: async (id) => {
      try {
          await fetch(`${BACKEND_API_URL}/deleteCourse/${id}`, {
              method: 'DELETE'
          });
      } catch (error) {
        console.error(error.message);
      }  
    },
    addUpcomingBatch: async (data) => {
        set({ addUpcomingBatchLoader: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addUpcomingBatch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            set({ addUpcomingBatchLoader: false });
        } catch (error) {
            console.error(error.message);
            set({ addUpcomingBatchLoader: false });
        }
    },
    getUpcomingBatch: async (id) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getUpcomingBatches/${id}`);
            const result = await response.json();
            set({ upcomingBatches: result.batches, batchLength:result.batchesLength });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteUpcomingBatch: async (id) => {
        try {
            await fetch(`${BACKEND_API_URL}/deleteUpcomingBatches/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    addCourseTopic: async (data) => {
        set({ addCourseTopicLoader: true });
        try {
            console.log(data);
            const response = await fetch(`${BACKEND_API_URL}/addTopic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise(resolve => setTimeout(resolve, 2000));
            set({ addCourseTopicLoader: false });
        } catch (error) {
            console.error(error.message);
            set({ addUpcomingBatchLoader: false });
        }
    },
    getTutorialTopic: async (instituteId) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/getTopicInfo/${instituteId}`);
            const result = await response.json();
            set({ courseTopics: result.topicInfo });
        } catch (error) {
            console.error(error.message);
        }
    },
    editTopic: async (id, data) => {
        try {
            await fetch(`${BACKEND_API_URL}/editTopic/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteTopic: async (id) => {
        try {
            await fetch(`${BACKEND_API_URL}/deleteTopic/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    addSubTopic: async (id, data) => {
        set({ addSubTopicLoader: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/addSubTopic/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            set({ addSubTopicLoader: false });
        } catch (error) {
            console.error(error.message);
            set({ addSubTopicLoader: false });
        }
    },
    editSubTopic: async (id, data) => {
        try {
            console.log(data);
            const response = await fetch(`${BACKEND_API_URL}/editSubTopic/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    deleteSubTopic: async (id, data) => {
        try {
            const response = await fetch(`${BACKEND_API_URL}/deleteSubTopic/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error.message);
        }
    },
    selectTopCourse: async (id, courseIds) => {
        set({ selectTopCourseLoader: true });
        try {
            const response = await fetch(`${BACKEND_API_URL}/selectTopCourse/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ courseIds })
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            set({ selectTopCourseLoader: false });
        } catch (error) {
            console.error(error.message);
            set({ selectTopCourseLoader: false });
        }
    }
}));

export default adminStore;