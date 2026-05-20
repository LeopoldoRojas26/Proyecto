import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, useColorScheme, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { usePlants } from '@/context/PlantsContext';

interface Message {
  id: string;
  sender: 'user' | 'greeny';
  text: string;
  timestamp: string;
}

export default function ChatScreen() {
  const { plantId } = useLocalSearchParams<{ plantId?: string }>();
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  
  const { plants } = usePlants();
  const selectedPlant = plantId ? plants.find(p => p.id === plantId) : undefined;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const storageKey = selectedPlant 
    ? `@greeny_chat_history_plant_${selectedPlant.id}`
    : '@greeny_chat_history_general';

  // Load chat history on mount
  useEffect(() => {
    async function loadChatHistory() {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          setMessages(JSON.parse(stored));
        } else {
          // Generate customized welcoming message
          let welcomeMessage = '';
          if (selectedPlant) {
            const nextWater = selectedPlant.nextWatering || 'próximamente';
            const healthEmoji = selectedPlant.healthStatus.emoji || '🌿';
            const healthText = selectedPlant.healthStatus.text || 'Normal';
            welcomeMessage = `¡Hola! Soy **Greeny** 🤖, tu asistente botánico personal. He estado revisando la ficha de tu **${selectedPlant.nickname}** (${selectedPlant.commonName}). Su estado de salud se reporta como **${healthText} ${healthEmoji}** y su próximo riego está programado para **${nextWater}**.\n\n¿En qué puedo ayudarte a cuidarla hoy? ¿Tienes dudas sobre su riego, luz, abono o notas algo extraño en sus hojas? 💧💚`;
          } else {
            welcomeMessage = '¡Hola! Soy **Greeny** 🤖, tu consejero verde. Estoy aquí para resolver cualquier consulta abierta sobre jardinería, consejos de cultivo, control de plagas, tipos de sustrato o el cuidado general de tus plantas.\n\n¿De qué te gustaría hablar hoy? 🌿🏡';
          }
          const defaultMessages: Message[] = [{
            id: 'welcome_' + Date.now(),
            sender: 'greeny',
            text: welcomeMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }];
          setMessages(defaultMessages);
          await AsyncStorage.setItem(storageKey, JSON.stringify(defaultMessages));
        }
      } catch (error) {
        console.error('Error al cargar historial de chat:', error);
      } finally {
        setLoadingHistory(false);
      }
    }
    loadChatHistory();
  }, [selectedPlant, storageKey]);

  // Scroll to bottom on new messages
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const saveMessages = async (updated: Message[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error('Error al guardar mensajes de chat:', e);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    setInputText('');

    const userMessage: Message = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);

    // Simulate Greeny Typing
    setIsTyping(true);
    setTimeout(() => {
      const greenyReplyText = generateGreenyResponse(userMsgText);
      const greenyMessage: Message = {
        id: 'msg_greeny_' + Date.now(),
        sender: 'greeny',
        text: greenyReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const nextMessages = [...updatedMessages, greenyMessage];
      setMessages(nextMessages);
      saveMessages(nextMessages);
      setIsTyping(false);
    }, 1200);
  };

  const handleClearHistory = () => {
    Pressable
    // Custom reset handler
    const defaultMsgText = selectedPlant
      ? `¡Hola! Soy **Greeny** 🤖, tu asistente botánico personal. He estado revisando la ficha de tu **${selectedPlant.nickname}** (${selectedPlant.commonName}). Su estado de salud se reporta como **${selectedPlant.healthStatus.text} ${selectedPlant.healthStatus.emoji}** y su próximo riego está programado para **${selectedPlant.nextWatering}**.\n\n¿En qué puedo ayudarte a cuidarla hoy? 💧💚`
      : '¡Hola! Soy **Greeny** 🤖, tu consejero verde. Estoy aquí para resolver cualquier consulta abierta sobre jardinería, consejos de cultivo o el cuidado general de tus plantas. ¿De qué te gustaría hablar hoy? 🌿🏡';

    const defaultMessages: Message[] = [{
      id: 'welcome_' + Date.now(),
      sender: 'greeny',
      text: defaultMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(defaultMessages);
    saveMessages(defaultMessages);
  };

  // Rule-based Contextual Response Generator
  const generateGreenyResponse = (query: string): string => {
    const q = query.toLowerCase();
    const isContextual = !!selectedPlant;
    const plantName = selectedPlant?.nickname || 'tu planta';
    const species = selectedPlant?.scientificName || 'esta especie';
    const category = selectedPlant?.category || 'interior';
    
    // 1. WATER AND IRRIGATION
    if (q.includes('riego') || q.includes('agua') || q.includes('regar') || q.includes('seco') || q.includes('hidrat')) {
      if (isContextual && selectedPlant) {
        return `Para tu **${plantName}** (${selectedPlant.commonName}), la frecuencia recomendada es **${selectedPlant.waterFrequency}**. Actualmente está registrado que su último riego fue **${selectedPlant.lastWatered}** y la próxima fecha estimada de riego es **${selectedPlant.nextWatering}**.\n\n💡 *Consejo de Greeny*: Te recomiendo tocar el sustrato introduciendo un dedo a unos 2 cm de profundidad; si la tierra está húmeda, pospón el riego un par de días. El exceso de humedad ahoga las raíces.`;
      }
      return `El riego correcto depende de muchos factores (tipo de planta, estación del año, clima). Como regla general:\n\n💧 **Riego en Interior**: Deja que la capa superior del sustrato se seque antes de volver a regar.\n🌵 **Suculentas/Cactus**: Riega únicamente cuando el sustrato esté 100% seco y las hojas se sientan ligeramente blandas.\n🌱 **Huerto**: Requiere riegos constantes y ligeros para mantener el suelo uniformemente húmedo.\n\n¡Asegúrate siempre de que las macetas tengan buen drenaje!`;
    }

    // 2. LEAVES AND FLOWERS STATUS
    if (q.includes('hoja') || q.includes('flor') || q.includes('flores') || q.includes('tallo') || q.includes('amarill') || q.includes('marron') || q.includes('seca')) {
      if (isContextual && selectedPlant) {
        const leafCount = selectedPlant.diary && selectedPlant.diary.length > 0 
          ? selectedPlant.diary[selectedPlant.diary.length - 1].leavesCount 
          : 'no registradas';
        const height = selectedPlant.diary && selectedPlant.diary.length > 0 
          ? selectedPlant.diary[selectedPlant.diary.length - 1].height 
          : 'no registrada';
        
        return `He revisado el diario de **${plantName}**. En tu registro más reciente se anotaron **${leafCount} hojas** y una altura de **${height} cm**.\n\n🍂 Si notas hojas amarillas, suele deberse a un exceso de riego o falta de nitrógeno en el abono.\n🔥 Si las puntas están marrones y secas, suele ser falta de humedad en el ambiente (común por calefacciones o aire seco) o quemaduras de sol.\n\n¿Has notado alguna de estas señales en sus hojas últimamente?`;
      }
      return `Las hojas son el principal indicador de salud de nuestras plantas:\n\n💛 **Hojas Amarillas**: Generalmente exceso de riego (las raíces se pudren y no absorben nutrientes), falta de luz, o falta de nitrógeno.\n🤎 **Puntas Marrones/Secas**: Falta de humedad ambiental. Puedes pulverizar agua templada sobre sus hojas o colocar un plato con piedras y agua debajo de la maceta (sin que toque el agua).\n🥀 **Caída de Hojas**: Estrés por corrientes de aire, cambios bruscos de temperatura o traslados recientes.`;
    }

    // 3. LIGHTING REQUIREMENTS
    if (q.includes('luz') || q.includes('sol') || q.includes('sombra') || q.includes('ilumina') || q.includes('ventana')) {
      if (isContextual && selectedPlant) {
        return `Tu **${plantName}** está clasificada con un requerimiento de iluminación de **${selectedPlant.light}**.\n\n☀️ Si es de *Sol directo*, necesita al menos 5-6 horas diarias de sol directo para crecer fuerte.\n⛅ Si es de *Semisombra*, la luz filtrada por una cortina translúcida cerca de una ventana es perfecta. Evita el sol del mediodía que podría causar quemaduras severas en sus tejidos.`;
      }
      return `La luz es la base del crecimiento de tus plantas. Se dividen principalmente en:\n\n☀️ **Sol Directo**: Cactus, suculentas, aromáticas y la mayoría de exteriores. Necesitan varias horas de sol al día.\n⛅ **Semisombra / Luz Brillante**: Monsteras, potos, helechos. Quieren mucha luz indirecta, pero el sol directo a través del vidrio quemará sus hojas.\n☁️ **Sombra**: Sansevierias, zamioculcas. Sobreviven con poca luz, aunque crecerán más rápido y saludables si reciben luz indirecta media. ¡Nunca las pongas a oscuras!`;
    }

    // 4. FERTILIZER AND NUTRIENTS
    if (q.includes('abono') || q.includes('fertiliz') || q.includes('nutrient') || q.includes('tierra') || q.includes('aliment')) {
      if (isContextual && selectedPlant) {
        return `Para **${plantName}** (${species}), el abonado es ideal de **primavera a otoño**, que es cuando está activa. En invierno es mejor suspenderlo ya que entra en reposo.\n\n🌱 Puedes aplicar un fertilizante líquido para plantas de categoría **${category}** diluido en el agua de riego cada 15-20 días. ¿Cuándo fue la última vez que la abonaste?`;
      }
      return `El abono es el "alimento" que repone los minerales que la planta absorbe del sustrato. Consejos clave:\n\n1. **Estacionalidad**: Abona únicamente en primavera y verano (época de crecimiento activo).\n2. **NPK**: El nitrógeno (N) promueve hojas verdes; el fósforo (P) estimula raíces y flores; el potasio (K) mejora la salud general.\n3. **Humus de Lombriz**: Es el mejor abono orgánico, no quema las raíces y mejora la textura del sustrato. Puedes mezclarlo con la tierra al trasplantar.`;
    }

    // 5. PESTS AND DISEASES
    if (q.includes('plaga') || q.includes('bicho') || q.includes('enferm') || q.includes('hongo') || q.includes('araña') || q.includes('cochinill') || q.includes('pulgon')) {
      if (isContextual && selectedPlant) {
        return `Revisando el historial de **${plantName}**, su estado reportado es **${selectedPlant.healthStatus.text}**.\n\n⚠️ Si has detectado algún insecto (como pelusa blanca algodonosa, pequeñas telarañas rojas o pulgones), te sugiero aislarla de inmediato para proteger tu jardín. Limpia las hojas afectadas con un paño húmedo con jabón potásico o aceite de neem diluido, o frota con algodón y alcohol de farmacia si son cochinillas algodonosas.`;
      }
      return `Las plagas más comunes en plantas y sus remedios ecológicos son:\n\n☁️ **Cochinilla Algodonosa**: Bichitos blancos con aspecto de algodón en los nudos. Quítalas una a una con un bastoncillo de algodón empapado en alcohol isopropílico.\n🕷️ **Araña Roja**: Diminutas arañas que dejan finas telarañas en el envés de las hojas, causadas por ambiente seco. Pulveriza agua para aumentar la humedad y aplica aceite de neem.\n🌱 **Pulgones**: Bichitos verdes, negros o amarillos en los brotes nuevos. Rocía una disolución de jabón potásico.`;
    }

    // 6. TRANSPLANTING AND RE-POTTING
    if (q.includes('trasplante') || q.includes('maceta') || q.includes('cambiar') || q.includes('sustrato')) {
      if (isContextual && selectedPlant) {
        return `Tu **${plantName}** está registrada en la ubicación **${selectedPlant.location}**. Si notas que las raíces salen por la parte inferior de la maceta o que la tierra ya no retiene agua, es momento de trasplantar.\n\n🏡 Elige una maceta que sea solo unos **2 o 3 centímetros más grande** que la actual para evitar acumulación excesiva de humedad en la tierra sobrante. Usa un sustrato de alta calidad adaptado para plantas de **${category}**.`;
      }
      return `El trasplante da espacio a las raíces para seguir expandiéndose. Ten en cuenta:\n\n📅 **Cuándo**: La primavera es el momento idóneo. Evita el invierno.\n🪴 **Maceta**: Que tenga agujeros de drenaje esenciales. Si pasas a una maceta gigante, la tierra tarda demasiado en secarse y puede pudrir las raíces.\n🧪 **Sustrato**: Mezcla 60% turba/fibra de coco, 20% perlita (para aireación y drenaje) y 20% humus de lombriz (nutrientes orgánicos).`;
    }

    // 7. GREETINGS
    if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenas tardes') || q.includes('saludo') || q.includes('greeny') || q.includes('asistente')) {
      if (isContextual) {
        return `¡Hola! Qué alegría saludarte. Estoy siempre listo para responder tus dudas sobre **${plantName}** 🌿. ¿Qué te gustaría consultar hoy sobre sus cuidados?`;
      }
      return `¡Hola! Qué alegría hablar contigo. Soy **Greeny**, tu asistente botánico inteligente. Pregúntame lo que necesites sobre riego, abonos, plagas, trasplantes o cómo diseñar tu rincón verde. 🌵🏡`;
    }

    // 8. DEFAULT RESPONSE
    if (isContextual) {
      return `He tomado nota de tu consulta sobre **${plantName}**. Recuerda que las plantas son muy sensibles a cambios en su entorno (luz indirecta, corrientes de aire, humedad ambiental). Si estás observando algún síntoma extraño en sus hojas, cuéntame más detalles y buscaremos la solución ideal juntas. 🌿💚`;
    }
    return `Es una consulta sumamente interesante. En el cuidado de plantas, pequeños ajustes en la iluminación, la mezcla del sustrato y la técnica de riego marcan una diferencia enorme. ¿Te gustaría que hablemos sobre cómo optimizar el drenaje de tus macetas o cómo identificar carencias de nutrientes en las hojas? 🌿`;
  };

  // Helper to format raw markdown texts slightly for mobile display
  const renderMessageText = (text: string) => {
    // Basic bold **text** parsing
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <Text key={index} style={styles.boldText}>{part}</Text>;
      }
      return part;
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen 
        options={{
          headerTitle: selectedPlant ? `Preguntar sobre ${selectedPlant.nickname}` : 'Asistente Greeny 🤖',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <Pressable onPress={handleClearHistory} style={styles.resetBtn}>
              <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
            </Pressable>
          )
        }}
      />

      {loadingHistory ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Cargando chat...</Text>
        </View>
      ) : (
        <>
          {/* Chat Messages scroll area */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => {
              const isGreeny = msg.sender === 'greeny';
              return (
                <View 
                  key={msg.id} 
                  style={[
                    styles.messageRow, 
                    isGreeny ? styles.rowGreeny : styles.rowUser
                  ]}
                >
                  {isGreeny && (
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                      <Ionicons name="logo-android" size={16} color="#FFFFFF" />
                    </View>
                  )}
                  
                  <View 
                    style={[
                      styles.bubble, 
                      isGreeny 
                        ? [styles.bubbleGreeny, { backgroundColor: colors.surface, borderColor: colors.border }] 
                        : [styles.bubbleUser, { backgroundColor: colors.primary }]
                    ]}
                  >
                    <Text 
                      style={[
                        styles.messageText, 
                        { color: isGreeny ? colors.text : '#FFFFFF' }
                      ]}
                    >
                      {renderMessageText(msg.text)}
                    </Text>
                    <Text 
                      style={[
                        styles.timestampText, 
                        { color: isGreeny ? colors.textSecondary : '#FFFFFF88' }
                      ]}
                    >
                      {msg.timestamp}
                    </Text>
                  </View>

                  {!isGreeny && (
                    <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
                      <Ionicons name="person" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              );
            })}

            {isTyping && (
              <View style={[styles.messageRow, styles.rowGreeny]}>
                <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                  <Ionicons name="logo-android" size={16} color="#FFFFFF" />
                </View>
                <View style={[styles.bubble, styles.bubbleGreeny, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={styles.typingIndicatorRow}>
                    <ActivityIndicator size="small" color={colors.primary} />
                    <Text style={[styles.typingText, { color: colors.textSecondary }]}>Greeny está respondiendo...</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Chat Input Row */}
          <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
            <TextInput
              placeholder="Escribe tu consulta sobre jardinería..."
              placeholderTextColor={colors.textSecondary + '88'}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
              style={[styles.textInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
            />
            <Pressable 
              onPress={handleSendMessage} 
              style={[
                styles.sendBtn, 
                { backgroundColor: inputText.trim() ? colors.primary : colors.textSecondary + '44' }
              ]}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '85%',
  },
  rowGreeny: {
    alignSelf: 'flex-start',
  },
  rowUser: {
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleGreeny: {
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    borderBottomRightRadius: 4,
    borderColor: 'transparent',
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  timestampText: {
    fontSize: 9,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  typingIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  typingText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtn: {
    marginRight: 8,
    padding: 6,
  },
});
