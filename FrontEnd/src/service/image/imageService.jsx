import axiosConfig from '../../config/axiosConfig.jsx';

class ImageService {

    async uploadImage(folderName, file) {
        const formData = new FormData();
        formData.append('file', file);

        return await axiosConfig.post(`/api/upload/${folderName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

}

const imageService = new ImageService();
export default imageService;
