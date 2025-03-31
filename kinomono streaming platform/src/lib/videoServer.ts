import path from 'path';
import fs from 'fs';

export interface LocalVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  path: string;
  duration: number;
  lastPlayed?: Date;
  progress?: number;
}

// This will store video metadata
export const videoLibrary: LocalVideo[] = [];

// Function to scan a directory for video files
export const scanDirectory = (directoryPath: string) => {
  const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov'];
  
  try {
    const files = fs.readdirSync(directoryPath);
    
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (videoExtensions.includes(ext)) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        
        videoLibrary.push({
          id: Buffer.from(filePath).toString('base64'),
          title: path.parse(file).name,
          description: `Added ${stats.mtime.toLocaleDateString()}`,
          thumbnail: '', // We'll generate these later
          path: filePath,
          duration: 0, // We'll get this from the video metadata
        });
      }
    });
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
};