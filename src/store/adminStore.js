import { create } from 'zustand';

export const BACKEND_API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

const adminStore = create((set) => ({
    instituteData: [],
    socialLinks: [],
    testimonial: [],
    tutorialSections: [],
    tutorials: [],
    tutorialChapters: [],
    isUpdateLoading: false,
    isAddSocialLinkLoading: false,
    isTestimonialAddedLoading: false,
    isUploadSection: false,
    addTutorialLoader: false,
    addChapterLoader: false,
    addChapterSubmit: false,
    addSubChapterSubmit: false,
    setAddChapterSubmit: () => set((state) => ({ addChapterSubmit: !state.addChapterSubmit })),
    setAddSubChapterSubmit: () => set((state) => ({ addSubChapterSubmit: !state.addSubChapterSubmit })),
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
            set({ isTestimonialAddedLoading: false });
        } catch (error) {
            console.error(error.message);
            set({ isTestimonialAddedLoading: false });
        }
    },
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
            new Promise(resolve => setTimeout(resolve, 2000));
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
            new Promise(resolve => setTimeout(resolve, 2000));
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
    }
}));

export default adminStore;