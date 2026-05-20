import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, useColorScheme, TextInput, Alert, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';

// Types definitions
interface Comment {
  id: string;
  author: string;
  text: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  isFollowing: boolean;
  title: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  timestamp: string;
}

interface ForumReply {
  id: string;
  author: string;
  text: string;
  isBestAnswer: boolean;
  timestamp: string;
}

interface ForumQuestion {
  id: string;
  title: string;
  category: 'General' | 'Riego' | 'Plagas' | 'Sustratos' | 'Abono';
  author: string;
  description: string;
  solved: boolean;
  replies: ForumReply[];
  timestamp: string;
}

const COMMUNITY_FEED_KEY = '@gardening_community_feed';
const COMMUNITY_FORUM_KEY = '@gardening_community_forum';
const COMMUNITY_INTERACTION_KEY = '@gardening_community_interacted';

export default function CommunityScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const { plants } = usePlants();

  // Sub-tabs state: 'feed' | 'forum' | 'achievements'
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'forum' | 'achievements'>('feed');

  // Community State Lists
  const [posts, setPosts] = useState<Post[]>([]);
  const [questions, setQuestions] = useState<ForumQuestion[]>([]);
  const [userInteracted, setUserInteracted] = useState(false); // Used to unlock 'Amigo Verde' achievement

  // Posting States (Feed)
  const [newPostText, setNewPostText] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostImageUrl, setNewPostImageUrl] = useState('');
  const [createPostExpanded, setCreatePostExpanded] = useState(false);

  // Comment Modal States
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState<Post | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Forum States
  const [selectedForumCategory, setSelectedForumCategory] = useState<'Todos' | 'General' | 'Riego' | 'Plagas' | 'Sustratos' | 'Abono'>('Todos');
  const [forumSearchQuery, setForumSearchQuery] = useState('');
  
  // Ask Question Forum States
  const [askQuestionExpanded, setAskQuestionExpanded] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<'General' | 'Riego' | 'Plagas' | 'Sustratos' | 'Abono'>('General');
  const [newQuestionDesc, setNewQuestionDesc] = useState('');

  // Question Detail Modal States
  const [questionDetailModalVisible, setQuestionDetailModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<ForumQuestion | null>(null);
  const [newReplyText, setNewReplyText] = useState('');

  // Initial load
  useEffect(() => {
    async function loadCommunityData() {
      try {
        const storedFeed = await AsyncStorage.getItem(COMMUNITY_FEED_KEY);
        const storedForum = await AsyncStorage.getItem(COMMUNITY_FORUM_KEY);
        const storedInteraction = await AsyncStorage.getItem(COMMUNITY_INTERACTION_KEY);

        if (storedInteraction) {
          setUserInteracted(JSON.parse(storedInteraction));
        }

        if (storedFeed) {
          setPosts(JSON.parse(storedFeed));
        } else {
          // Beautiful default posts
          const defaultFeed: Post[] = [
            {
              id: 'post_1',
              author: 'Laura Botánica',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
              isFollowing: true,
              title: '¡Miren esta nueva hoja gigante! 🌿😍',
              content: 'Mi Monstera Deliciosa ha abierto hoy su hoja número 6. Le apliqué abono orgánico con humus de lombriz y una buena pulverizada ambiental de agua tibia hace dos semanas, ¡y funcionó de maravilla!',
              image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
              likes: 42,
              liked: false,
              comments: [
                { id: 'c_1', author: 'Carlos_Plantas', text: '¡Qué belleza! Se nota el amor que le das.' },
                { id: 'c_2', author: 'Ana_Sukk', text: '¿La riegas por inmersión o de forma directa?' }
              ],
              timestamp: 'Hace 2 horas'
            },
            {
              id: 'post_2',
              author: 'Pedro_Jardinero',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
              isFollowing: false,
              title: '¿Problema con mi Rosal de Miniatura? 🕷️😢',
              content: 'Hola comunidad. He notado diminutas telarañas en el envés de las hojas y puntas amarillentas en mi rosal. Sospecho de Araña Roja debido al aire seco de la sala. ¿Me recomiendan algún método casero inmediato?',
              image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
              likes: 12,
              liked: false,
              comments: [
                { id: 'c_3', author: 'Laura Botánica', text: '¡Hola Pedro! Sí, es araña roja sin duda. Aísla tu planta de inmediato. Rocía con jabón potásico diluido con neem cada 3 días, y dale humedad ambiental.' }
              ],
              timestamp: 'Hace 5 horas'
            }
          ];
          setPosts(defaultFeed);
          await AsyncStorage.setItem(COMMUNITY_FEED_KEY, JSON.stringify(defaultFeed));
        }

        if (storedForum) {
          setQuestions(JSON.parse(storedForum));
        } else {
          // Default Q&A Questions
          const defaultForum: ForumQuestion[] = [
            {
              id: 'fq_1',
              title: '¿Con qué frecuencia se debe regar la Lengua de Suegra?',
              category: 'Riego',
              author: 'Sofía_M',
              description: 'Acabo de adoptar una Sansevieria en el dormitorio. Hay luz media brillante indirecta. ¿Debo regar cada semana o es mejor esperar a que esté completamente seca?',
              solved: true,
              replies: [
                {
                  id: 'fr_1',
                  author: 'Carlos_Plantas',
                  text: '¡Hola Sofía! El peor enemigo de la Sansevieria es el exceso de agua. Regar cada 20 días en primavera/verano y una vez al mes en invierno es lo ideal. Espera a que el sustrato esté 100% seco y usa tierra arenosa.',
                  isBestAnswer: true,
                  timestamp: 'Hace 1 día'
                },
                {
                  id: 'fr_2',
                  author: 'Julián_H',
                  text: 'Coincido. Yo la mía solo la riego cuando veo que sus hojas se arrugan muy sutilmente.',
                  isBestAnswer: false,
                  timestamp: 'Hace 12 horas'
                }
              ],
              timestamp: 'Hace 2 días'
            },
            {
              id: 'fq_2',
              title: 'Sustrato ideal para propagar suculentas por hoja',
              category: 'Sustratos',
              author: 'Ana_Sukk',
              description: 'Hola. Estoy intentando enraizar hojitas de echeveria en una bandeja. ¿Cuál es el mejor sustrato? ¿Debo humedecerlo a diario o es mejor dejarlo seco?',
              solved: false,
              replies: [
                {
                  id: 'fr_3',
                  author: 'Laura Botánica',
                  text: 'Usa una mezcla muy porosa de turba fina con perlita (50/50). No las riegues hasta que veas brotar la pequeña raíz. La humedad inicial puede pudrir la hoja antes de que nazca el brote.',
                  isBestAnswer: false,
                  timestamp: 'Hace 10 horas'
                }
              ],
              timestamp: 'Hace 15 horas'
            }
          ];
          setQuestions(defaultForum);
          await AsyncStorage.setItem(COMMUNITY_FORUM_KEY, JSON.stringify(defaultForum));
        }
      } catch (error) {
        console.error('Error cargando datos de comunidad:', error);
      }
    }
    loadCommunityData();
  }, []);

  // Update AsyncStorage helpers
  const savePostsState = async (updated: Post[]) => {
    setPosts(updated);
    await AsyncStorage.setItem(COMMUNITY_FEED_KEY, JSON.stringify(updated));
  };

  const saveForumState = async (updated: ForumQuestion[]) => {
    setQuestions(updated);
    await AsyncStorage.setItem(COMMUNITY_FORUM_KEY, JSON.stringify(updated));
  };

  const registerInteraction = async () => {
    if (!userInteracted) {
      setUserInteracted(true);
      await AsyncStorage.setItem(COMMUNITY_INTERACTION_KEY, JSON.stringify(true));
    }
  };

  // ==========================================
  //            FEED INTERACTIONS
  // ==========================================
  const handleLikePost = async (id: string) => {
    const updated = posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    });
    await savePostsState(updated);
    await registerInteraction();
  };

  const handleFollowUser = async (authorName: string) => {
    const updated = posts.map(post => {
      if (post.author === authorName) {
        return {
          ...post,
          isFollowing: !post.isFollowing
        };
      }
      return post;
    });
    await savePostsState(updated);
    Alert.alert(
      updated.find(p => p.author === authorName)?.isFollowing ? '¡Siguiendo!' : 'Dejaste de seguir',
      `${updated.find(p => p.author === authorName)?.isFollowing ? 'Ahora sigues' : 'Ya no sigues'} las publicaciones de ${authorName}.`
    );
  };

  const handleOpenComments = (post: Post) => {
    setSelectedPostForComments(post);
    setCommentModalVisible(true);
  };

  const handleAddComment = async () => {
    if (!newCommentText.trim() || !selectedPostForComments) return;

    const newComment: Comment = {
      id: 'c_' + Date.now(),
      author: 'Tú (Jardinero)',
      text: newCommentText.trim()
    };

    const updatedPosts = posts.map(post => {
      if (post.id === selectedPostForComments.id) {
        const nextComments = [...post.comments, newComment];
        // Keep selected post local reference in sync
        setSelectedPostForComments({ ...post, comments: nextComments });
        return {
          ...post,
          comments: nextComments
        };
      }
      return post;
    });

    await savePostsState(updatedPosts);
    setNewCommentText('');
    await registerInteraction();
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostText.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa un título y descripción.');
      return;
    }

    const newPost: Post = {
      id: 'post_user_' + Date.now(),
      author: 'Tú (Jardinero)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      isFollowing: false,
      title: newPostTitle.trim(),
      content: newPostText.trim(),
      image: newPostImageUrl.trim() || undefined,
      likes: 0,
      liked: false,
      comments: [],
      timestamp: 'Ahora mismo'
    };

    const updated = [newPost, ...posts];
    await savePostsState(updated);
    
    // Clear inputs and collapse
    setNewPostTitle('');
    setNewPostText('');
    setNewPostImageUrl('');
    setCreatePostExpanded(false);
    await registerInteraction();
    Alert.alert('¡Publicado!', 'Tu post se ha subido al feed con éxito.');
  };

  // ==========================================
  //            FORUM INTERACTIONS
  // ==========================================
  const handleCreateQuestion = async () => {
    if (!newQuestionTitle.trim() || !newQuestionDesc.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa un título y una descripción de tu consulta.');
      return;
    }

    const newQuestion: ForumQuestion = {
      id: 'fq_user_' + Date.now(),
      title: newQuestionTitle.trim(),
      category: newQuestionCategory,
      author: 'Tú (Jardinero)',
      description: newQuestionDesc.trim(),
      solved: false,
      replies: [],
      timestamp: 'Ahora mismo'
    };

    const updated = [newQuestion, ...questions];
    await saveForumState(updated);

    setNewQuestionTitle('');
    setNewQuestionDesc('');
    setAskQuestionExpanded(false);
    await registerInteraction();
    Alert.alert('¡Pregunta publicada!', 'La comunidad ha sido notificada de tu consulta.');
  };

  const handleOpenQuestionDetails = (question: ForumQuestion) => {
    setSelectedQuestion(question);
    setQuestionDetailModalVisible(true);
  };

  const handleAddReply = async () => {
    if (!newReplyText.trim() || !selectedQuestion) return;

    const newReply: ForumReply = {
      id: 'fr_user_' + Date.now(),
      author: 'Tú (Jardinero)',
      text: newReplyText.trim(),
      isBestAnswer: false,
      timestamp: 'Ahora mismo'
    };

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestion.id) {
        const nextReplies = [...q.replies, newReply];
        setSelectedQuestion({ ...q, replies: nextReplies });
        return {
          ...q,
          replies: nextReplies
        };
      }
      return q;
    });

    await saveForumState(updatedQuestions);
    setNewReplyText('');
    await registerInteraction();
  };

  const handleMarkAsBestAnswer = async (replyId: string) => {
    if (!selectedQuestion) return;

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestion.id) {
        const nextReplies = q.replies.map(r => ({
          ...r,
          isBestAnswer: r.id === replyId
        }));
        const updatedQ = {
          ...q,
          solved: true,
          replies: nextReplies
        };
        setSelectedQuestion(updatedQ);
        return updatedQ;
      }
      return q;
    });

    await saveForumState(updatedQuestions);
    Alert.alert('¡Mejor Respuesta!', 'Has marcado esta respuesta como la mejor del hilo. ¡Tema solucionado! ✨');
  };

  // Filtered Forum Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesCategory = selectedForumCategory === 'Todos' || q.category === selectedForumCategory;
      const matchesSearch = q.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) || 
                            q.description.toLowerCase().includes(forumSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [questions, selectedForumCategory, forumSearchQuery]);

  // ==========================================
  //          ACHIEVEMENTS EVALUATIONS
  // ==========================================
  const dynamicAchievements = useMemo(() => {
    const hasAnyPlant = plants.length >= 1;
    const hasThreePlants = plants.length >= 3;
    const hasSucculent = plants.some(p => p.category === 'Suculentas');
    const hasHuerto = plants.some(p => p.category === 'Huerto');
    const hasDiary = plants.some(p => p.diary && p.diary.length > 0);
    const hasSocial = userInteracted; // likes/comments/posts

    return [
      {
        id: 'ach_1',
        title: 'Primera Planta 🌿',
        desc: 'Añade tu primera planta al jardín personal.',
        requirement: 'Tener 1 o más plantas en tu jardín',
        unlocked: hasAnyPlant,
        icon: 'leaf',
        color: '#4CAF50'
      },
      {
        id: 'ach_2',
        title: 'Coleccionista Botánico 📚',
        desc: 'Expande tu jardín con una bonita variedad botánica.',
        requirement: 'Tener 3 o más plantas registradas',
        unlocked: hasThreePlants,
        icon: 'book',
        color: '#2196F3'
      },
      {
        id: 'ach_3',
        title: 'Experto en Suculentas 🌵',
        desc: 'Demuestra tu habilidad cuidando plantas áridas.',
        requirement: 'Tener al menos una suculenta o cactus',
        unlocked: hasSucculent,
        icon: 'flower',
        color: '#E91E63'
      },
      {
        id: 'ach_4',
        title: 'Huerto en Casa 🍓',
        desc: 'Comienza a cultivar tus propios frutos o vegetales.',
        requirement: 'Tener al menos una planta de huerto',
        unlocked: hasHuerto,
        icon: 'nutrition',
        color: '#FF9800'
      },
      {
        id: 'ach_5',
        title: 'Diario Activo ✍️',
        desc: 'Registra y monitorea el crecimiento visual de tus plantas.',
        requirement: 'Haber añadido al menos una entrada de diario',
        unlocked: hasDiary,
        icon: 'create',
        color: '#9C27B0'
      },
      {
        id: 'ach_6',
        title: 'Amigo Verde 👥',
        desc: 'Participa y apoya a la comunidad del foro.',
        requirement: 'Dar un like, comentar, postear o responder en la comunidad',
        unlocked: hasSocial,
        icon: 'people',
        color: '#00BCD4'
      }
    ];
  }, [plants, userInteracted]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Custom Sub-Tabs Switcher */}
      <View style={[styles.subTabBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable 
          onPress={() => setActiveSubTab('feed')}
          style={[styles.subTabItem, activeSubTab === 'feed' && [styles.subTabItemActive, { borderBottomColor: colors.primary }]]}
        >
          <Ionicons name="chatbox-ellipses-outline" size={18} color={activeSubTab === 'feed' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.subTabText, { color: activeSubTab === 'feed' ? colors.text : colors.textSecondary }]}>Feed</Text>
        </Pressable>

        <Pressable 
          onPress={() => setActiveSubTab('forum')}
          style={[styles.subTabItem, activeSubTab === 'forum' && [styles.subTabItemActive, { borderBottomColor: colors.primary }]]}
        >
          <Ionicons name="help-circle-outline" size={18} color={activeSubTab === 'forum' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.subTabText, { color: activeSubTab === 'forum' ? colors.text : colors.textSecondary }]}>Foro</Text>
        </Pressable>

        <Pressable 
          onPress={() => setActiveSubTab('achievements')}
          style={[styles.subTabItem, activeSubTab === 'achievements' && [styles.subTabItemActive, { borderBottomColor: colors.primary }]]}
        >
          <Ionicons name="trophy-outline" size={18} color={activeSubTab === 'achievements' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.subTabText, { color: activeSubTab === 'achievements' ? colors.text : colors.textSecondary }]}>Logros</Text>
        </Pressable>
      </View>

      {/* ========================================================================= */}
      {/*                               FEED TAB VIEW                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'feed' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Collapse/Expand Create Post Panel */}
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Pressable 
              onPress={() => setCreatePostExpanded(!createPostExpanded)}
              style={styles.expandHeader}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
              <Text style={[styles.expandTitle, { color: colors.text }]}>¿Algo que compartir en el feed? 🌿</Text>
              <Ionicons name={createPostExpanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
            </Pressable>

            {createPostExpanded && (
              <View style={styles.expandContent}>
                <TextInput
                  placeholder="Título de la publicación..."
                  placeholderTextColor={colors.textSecondary + '88'}
                  value={newPostTitle}
                  onChangeText={setNewPostTitle}
                  style={[styles.formInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                />
                <TextInput
                  placeholder="Escribe consejos, preguntas o el progreso de tus plantas..."
                  placeholderTextColor={colors.textSecondary + '88'}
                  multiline
                  numberOfLines={3}
                  value={newPostText}
                  onChangeText={setNewPostText}
                  style={[styles.formArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                />
                <TextInput
                  placeholder="URL de foto opcional (o déjalo en blanco)..."
                  placeholderTextColor={colors.textSecondary + '88'}
                  value={newPostImageUrl}
                  onChangeText={setNewPostImageUrl}
                  style={[styles.formInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                />
                <Pressable 
                  onPress={handleCreatePost}
                  style={[styles.btnPrimary, { backgroundColor: colors.primary }]}
                >
                  <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.btnPrimaryText}>Publicar en Feed</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Posts List */}
          {posts.map((post) => (
            <View key={post.id} style={[styles.postCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {/* Post Author Row */}
              <View style={styles.authorRow}>
                <Image source={{ uri: post.avatar }} style={styles.authorAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.authorName, { color: colors.text }]}>{post.author}</Text>
                  <Text style={[styles.postTime, { color: colors.textSecondary }]}>{post.timestamp}</Text>
                </View>
                {post.author !== 'Tú (Jardinero)' && (
                  <Pressable 
                    onPress={() => handleFollowUser(post.author)}
                    style={[
                      styles.followBtn, 
                      { borderColor: post.isFollowing ? colors.border : colors.primary, backgroundColor: post.isFollowing ? colors.background : 'transparent' }
                    ]}
                  >
                    <Text style={[styles.followBtnText, { color: post.isFollowing ? colors.textSecondary : colors.primary }]}>
                      {post.isFollowing ? 'Siguiendo' : '+ Seguir'}
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Post Content */}
              <View style={styles.postBody}>
                <Text style={[styles.postTitle, { color: colors.text }]}>{post.title}</Text>
                <Text style={[styles.postText, { color: colors.textSecondary }]}>{post.content}</Text>
              </View>

              {/* Post Image */}
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} contentFit="cover" />
              )}

              {/* Post Actions (Likes & Comments) */}
              <View style={[styles.postFooter, { borderTopColor: colors.border }]}>
                <Pressable onPress={() => handleLikePost(post.id)} style={styles.footerAction}>
                  <Ionicons 
                    name={post.liked ? "heart" : "heart-outline"} 
                    size={20} 
                    color={post.liked ? colors.notification : colors.textSecondary} 
                  />
                  <Text style={[styles.actionNum, { color: post.liked ? colors.notification : colors.textSecondary }]}>
                    {post.likes}
                  </Text>
                </Pressable>

                <Pressable onPress={() => handleOpenComments(post)} style={styles.footerAction}>
                  <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
                  <Text style={[styles.actionNum, { color: colors.textSecondary }]}>
                    {post.comments.length}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* ========================================================================= */}
      {/*                               FORUM TAB VIEW                              */}
      {/* ========================================================================= */}
      {activeSubTab === 'forum' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Forum search input */}
          <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.textSecondary} />
            <TextInput
              placeholder="Buscar preguntas en el foro..."
              placeholderTextColor={colors.textSecondary + '88'}
              value={forumSearchQuery}
              onChangeText={setForumSearchQuery}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>

          {/* Forum Category Horizontal Selectors */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryChipsBar}>
            {['Todos', 'General', 'Riego', 'Plagas', 'Sustratos', 'Abono'].map((cat) => {
              const isActive = selectedForumCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedForumCategory(cat as any)}
                  style={[
                    styles.catChip,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    isActive && [styles.catChipActive, { backgroundColor: colors.primary }]
                  ]}
                >
                  <Text style={[styles.catChipText, { color: isActive ? '#FFFFFF' : colors.text }]}>{cat}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Ask Question Forum Panel */}
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Pressable 
              onPress={() => setAskQuestionExpanded(!askQuestionExpanded)}
              style={styles.expandHeader}
            >
              <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
              <Text style={[styles.expandTitle, { color: colors.text }]}>¿Tienes alguna duda botánica? 💬</Text>
              <Ionicons name={askQuestionExpanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
            </Pressable>

            {askQuestionExpanded && (
              <View style={styles.expandContent}>
                <TextInput
                  placeholder="Título breve de tu consulta..."
                  placeholderTextColor={colors.textSecondary + '88'}
                  value={newQuestionTitle}
                  onChangeText={setNewQuestionTitle}
                  style={[styles.formInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                />
                
                {/* Category selector row */}
                <View style={styles.formRow}>
                  <Text style={[styles.formLabel, { color: colors.text }]}>Categoría:</Text>
                  <View style={styles.formSubChips}>
                    {['General', 'Riego', 'Plagas', 'Sustratos', 'Abono'].map((cat) => (
                      <Pressable 
                        key={cat}
                        onPress={() => setNewQuestionCategory(cat as any)}
                        style={[
                          styles.subChip, 
                          { backgroundColor: colors.background, borderColor: colors.border },
                          newQuestionCategory === cat && { backgroundColor: colors.primary }
                        ]}
                      >
                        <Text style={[styles.subChipText, { color: newQuestionCategory === cat ? '#FFF' : colors.text }]}>
                          {cat}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <TextInput
                  placeholder="Describe con detalle los síntomas, luz, riego e historial..."
                  placeholderTextColor={colors.textSecondary + '88'}
                  multiline
                  numberOfLines={4}
                  value={newQuestionDesc}
                  onChangeText={setNewQuestionDesc}
                  style={[styles.formArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                />
                <Pressable 
                  onPress={handleCreateQuestion}
                  style={[styles.btnPrimary, { backgroundColor: colors.primary }]}
                >
                  <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.btnPrimaryText}>Preguntar a Comunidad</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Questions list */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preguntas Recientes</Text>
          {filteredQuestions.map((q) => (
            <Pressable 
              key={q.id} 
              onPress={() => handleOpenQuestionDetails(q)}
              style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={styles.questionHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.categoryText, { color: colors.primary }]}>{q.category}</Text>
                </View>
                {q.solved && (
                  <View style={[styles.solvedBadge, { backgroundColor: colors.success + '22' }]}>
                    <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                    <Text style={[styles.solvedText, { color: colors.success }]}>Resuelto</Text>
                  </View>
                )}
                <Text style={[styles.postTime, { color: colors.textSecondary, marginLeft: 'auto' }]}>{q.timestamp}</Text>
              </View>
              
              <Text style={[styles.questionTitleText, { color: colors.text }]}>{q.title}</Text>
              <Text style={[styles.questionDescSnippet, { color: colors.textSecondary }]} numberOfLines={2}>
                {q.description}
              </Text>

              <View style={[styles.questionFooter, { borderTopColor: colors.border + '15' }]}>
                <Text style={[styles.authorLabel, { color: colors.textSecondary }]}>Por: {q.author}</Text>
                <View style={styles.replyCounter}>
                  <Ionicons name="chatbubbles-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.replyCounterText, { color: colors.textSecondary }]}>
                    {q.replies.length} {q.replies.length === 1 ? 'respuesta' : 'respuestas'}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* ========================================================================= */}
      {/*                           ACHIEVEMENTS TAB VIEW                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'achievements' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.achievementsIntro}>
            <Ionicons name="ribbon-outline" size={48} color={colors.primary} />
            <Text style={[styles.introTitle, { color: colors.text }]}>Medallas y Logros de Jardinería 🏆</Text>
            <Text style={[styles.introDesc, { color: colors.textSecondary }]}>
              ¡Desbloquea medallas automáticamente al interactuar con tus plantas, actualizar el diario de crecimiento o participar en la comunidad!
            </Text>
          </View>

          <View style={styles.badgeGrid}>
            {dynamicAchievements.map((ach) => (
              <View 
                key={ach.id} 
                style={[
                  styles.badgeCard, 
                  { 
                    backgroundColor: colors.surface, 
                    borderColor: ach.unlocked ? colors.primary : colors.border,
                    opacity: ach.unlocked ? 1 : 0.6
                  }
                ]}
              >
                {/* Check / Lock visual indicators */}
                <View style={styles.indicatorContainer}>
                  {ach.unlocked ? (
                    <View style={[styles.completeBadge, { backgroundColor: colors.success }]}>
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    </View>
                  ) : (
                    <View style={[styles.lockBadge, { backgroundColor: colors.textSecondary }]}>
                      <Ionicons name="lock-closed" size={10} color="#FFFFFF" />
                    </View>
                  )}
                </View>

                {/* Badge Icon */}
                <View 
                  style={[
                    styles.iconCircle, 
                    { backgroundColor: ach.unlocked ? ach.color + '15' : colors.background }
                  ]}
                >
                  <Ionicons 
                    name={ach.icon as any} 
                    size={28} 
                    color={ach.unlocked ? ach.color : colors.textSecondary + '88'} 
                  />
                </View>

                <Text style={[styles.badgeTitle, { color: colors.text }]}>{ach.title}</Text>
                <Text style={[styles.badgeDesc, { color: colors.textSecondary }]}>{ach.desc}</Text>
                
                {/* Requirements indicator footer */}
                <View style={[styles.reqFooter, { backgroundColor: colors.background }]}>
                  <Text style={[styles.reqText, { color: colors.textSecondary }]} numberOfLines={2}>
                    Req: {ach.requirement}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* ========================================================================= */}
      {/*                            COMMENTS MODAL LAYOUT                          */}
      {/* ========================================================================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={[styles.modalSheet, { backgroundColor: colors.surface }]}>
            {/* Header */}
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Comentarios</Text>
              <Pressable onPress={() => setCommentModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            {/* List */}
            {selectedPostForComments && (
              <FlatList
                data={selectedPostForComments.comments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.commentList}
                renderItem={({ item }) => (
                  <View style={[styles.commentRow, { borderBottomColor: colors.border + '15' }]}>
                    <Text style={[styles.commentAuthor, { color: colors.text }]}>{item.author}</Text>
                    <Text style={[styles.commentText, { color: colors.textSecondary }]}>{item.text}</Text>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={[styles.emptyCommentText, { color: colors.textSecondary }]}>
                    No hay comentarios todavía. ¡Sé el primero en comentar!
                  </Text>
                }
              />
            )}

            {/* Form */}
            <View style={[styles.commentInputRow, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
              <TextInput
                placeholder="Añadir un comentario..."
                placeholderTextColor={colors.textSecondary + '88'}
                value={newCommentText}
                onChangeText={setNewCommentText}
                style={[styles.commentInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              />
              <Pressable 
                onPress={handleAddComment} 
                style={[styles.commentSendBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/*                            QUESTION DETAILS MODAL                         */}
      {/* ========================================================================= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={questionDetailModalVisible}
        onRequestClose={() => setQuestionDetailModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={[styles.modalSheet, { backgroundColor: colors.surface }]}>
            {/* Header */}
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]} numberOfLines={1}>Consulta de {selectedQuestion?.author}</Text>
              <Pressable onPress={() => setQuestionDetailModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            {/* Question Details Content Scroll */}
            {selectedQuestion && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.qModalScroll}>
                <View style={styles.qModalDetailsHeader}>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.categoryText, { color: colors.primary }]}>{selectedQuestion.category}</Text>
                  </View>
                  <Text style={[styles.postTime, { color: colors.textSecondary }]}>{selectedQuestion.timestamp}</Text>
                </View>

                <Text style={[styles.qModalTitleText, { color: colors.text }]}>{selectedQuestion.title}</Text>
                <Text style={[styles.qModalDescText, { color: colors.textSecondary }]}>{selectedQuestion.description}</Text>

                {/* Separator */}
                <View style={[styles.qDivider, { backgroundColor: colors.border }]} />

                {/* Answers Section */}
                <Text style={[styles.answersTitle, { color: colors.text }]}>Respuestas ({selectedQuestion.replies.length})</Text>
                
                {selectedQuestion.replies.length === 0 ? (
                  <Text style={[styles.emptyRepliesText, { color: colors.textSecondary }]}>
                    No hay respuestas aún para esta duda. ¡Responde y ayuda al jardinero!
                  </Text>
                ) : (
                  // Sort replies to put Best Answer on top
                  [...selectedQuestion.replies]
                    .sort((a, b) => (b.isBestAnswer ? 1 : 0) - (a.isBestAnswer ? 1 : 0))
                    .map((reply) => (
                      <View 
                        key={reply.id} 
                        style={[
                          styles.replyCard, 
                          { backgroundColor: colors.background, borderColor: colors.border },
                          reply.isBestAnswer && [styles.bestReplyCard, { borderColor: colors.success }]
                        ]}
                      >
                        <View style={styles.replyHeader}>
                          <Text style={[styles.replyAuthor, { color: colors.text }]}>{reply.author}</Text>
                          <Text style={[styles.postTime, { color: colors.textSecondary }]}>{reply.timestamp}</Text>
                          
                          {reply.isBestAnswer && (
                            <View style={[styles.bestAnswerBadge, { backgroundColor: colors.success }]}>
                              <Ionicons name="checkmark-circle" size={10} color="#FFFFFF" />
                              <Text style={styles.bestAnswerText}>Mejor Respuesta</Text>
                            </View>
                          )}
                        </View>
                        
                        <Text style={[styles.replyTextBody, { color: colors.textSecondary }]}>{reply.text}</Text>

                        {/* Mark best answer option button */}
                        {!selectedQuestion.solved && reply.author !== 'Tú (Jardinero)' && (
                          <Pressable 
                            onPress={() => handleMarkAsBestAnswer(reply.id)}
                            style={[styles.markBestBtn, { borderColor: colors.success }]}
                          >
                            <Ionicons name="star-outline" size={12} color={colors.success} />
                            <Text style={[styles.markBestBtnText, { color: colors.success }]}>
                              Marcar como Mejor Respuesta
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    ))
                )}
              </ScrollView>
            )}

            {/* Form */}
            <View style={[styles.commentInputRow, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
              <TextInput
                placeholder="Escribe tu recomendación o respuesta..."
                placeholderTextColor={colors.textSecondary + '88'}
                value={newReplyText}
                onChangeText={setNewReplyText}
                style={[styles.commentInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              />
              <Pressable 
                onPress={handleAddReply} 
                style={[styles.commentSendBtn, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="send" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: 48,
    paddingHorizontal: 8,
  },
  subTabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingVertical: 10,
  },
  subTabItemActive: {
    // sets colors.primary in code
  },
  subTabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  expandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
  },
  expandContent: {
    marginTop: 14,
    gap: 10,
  },
  formInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  formArea: {
    height: 72,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    textAlignVertical: 'top',
  },
  formRow: {
    gap: 6,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  formSubChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  subChipText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  btnPrimary: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* FEED POST CARDS */
  postCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  authorName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 10,
  },
  followBtn: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  followBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  postBody: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    gap: 4,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 13,
    lineHeight: 18,
  },
  postImage: {
    width: '100%',
    height: 220,
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 16,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionNum: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* FORUM STYLES */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    height: '100%',
  },
  categoryChipsBar: {
    gap: 6,
    paddingVertical: 4,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  catChipActive: {
    borderColor: 'transparent',
  },
  catChipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: -4,
  },
  questionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  solvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  solvedText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  questionTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  questionDescSnippet: {
    fontSize: 12,
    lineHeight: 16,
  },
  questionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 2,
  },
  authorLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  replyCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyCounterText: {
    fontSize: 11,
    fontWeight: '600',
  },

  /* ACHIEVEMENTS GRID */
  achievementsIntro: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    textAlign: 'center',
  },
  introTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  introDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  completeBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeDesc: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 13,
    flex: 1,
  },
  reqFooter: {
    width: '115%',
    padding: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  reqText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 10,
  },

  /* MODALS OVERLAYS */
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    height: '75%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  modalCloseBtn: {
    padding: 4,
  },
  commentList: {
    padding: 20,
    gap: 14,
  },
  commentRow: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 2,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyCommentText: {
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 60,
    fontStyle: 'italic',
  },
  commentInputRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 13,
  },
  commentSendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* QUESTION DETAILS MODAL SCROLL */
  qModalScroll: {
    padding: 20,
    gap: 12,
  },
  qModalDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qModalTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  qModalDescText: {
    fontSize: 13,
    lineHeight: 18,
  },
  qDivider: {
    height: 1,
    marginVertical: 4,
  },
  answersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyRepliesText: {
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 32,
    textAlign: 'center',
  },
  replyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 6,
    marginBottom: 8,
  },
  bestReplyCard: {
    borderWidth: 2,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  replyAuthor: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestAnswerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  bestAnswerText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  replyTextBody: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  markBestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  markBestBtnText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});
