import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Collection references
const ALUMNI_COLLECTION = 'alumni';
const USERS_COLLECTION = 'users';
const EVENTS_COLLECTION = 'events';
const BLOG_COLLECTION = 'blog';

// Alumni operations
export const alumniService = {
  // Get all alumni members
  async getAllAlumni() {
    try {
      const q = query(collection(db, ALUMNI_COLLECTION), orderBy('name'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching alumni:', error);
      throw error;
    }
  },

  // Get alumni by ID
  async getAlumniById(id) {
    try {
      const docRef = doc(db, ALUMNI_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching alumni by ID:', error);
      throw error;
    }
  },

  // Search alumni by name
  async searchAlumniByName(searchTerm) {
    try {
      const q = query(
        collection(db, ALUMNI_COLLECTION),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error searching alumni:', error);
      throw error;
    }
  },

  // Filter alumni by batch
  async getAlumniByBatch(batch) {
    try {
      const q = query(
        collection(db, ALUMNI_COLLECTION),
        where('batch', '==', batch)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error filtering alumni by batch:', error);
      throw error;
    }
  },

  // Filter alumni by profession
  async getAlumniByProfession(profession) {
    try {
      const q = query(
        collection(db, ALUMNI_COLLECTION),
        where('profession', '==', profession)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error filtering alumni by profession:', error);
      throw error;
    }
  },

  // Add new alumni member
  async addAlumni(alumniData) {
    try {
      const docRef = await addDoc(collection(db, ALUMNI_COLLECTION), {
        ...alumniData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...alumniData };
    } catch (error) {
      console.error('Error adding alumni:', error);
      throw error;
    }
  },

  // Update alumni member
  async updateAlumni(id, updateData) {
    try {
      const docRef = doc(db, ALUMNI_COLLECTION, id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating alumni:', error);
      throw error;
    }
  },

  // Delete alumni member
  async deleteAlumni(id) {
    try {
      const docRef = doc(db, ALUMNI_COLLECTION, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting alumni:', error);
      throw error;
    }
  }
};

// User operations
export const userService = {
  // Get user profile
  async getUserProfile(userId) {
    try {
      const docRef = doc(db, USERS_COLLECTION, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Create or update user profile
  async upsertUserProfile(userId, userData) {
    try {
      const docRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(docRef, {
        ...userData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { id: userId, ...userData };
    } catch (error) {
      console.error('Error upserting user profile:', error);
      throw error;
    }
  }
};

// Events operations
export const eventService = {
  // Get all events
  async getAllEvents() {
    try {
      const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Add new event
  async addEvent(eventData) {
    try {
      const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
        ...eventData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...eventData };
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }
};

// Blog operations
export const blogService = {
  // Get all blog posts
  async getAllBlogPosts() {
    try {
      const q = query(collection(db, BLOG_COLLECTION), orderBy('publishedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Add new blog post
  async addBlogPost(blogData) {
    try {
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
        ...blogData,
        publishedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...blogData };
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  }
};
