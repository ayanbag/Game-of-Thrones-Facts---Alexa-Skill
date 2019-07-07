const Alexa = require('ask-sdk-core');
const cookbook = require('./alexa-cookbook.js');


const SKILL_NAME = 'Game of Thrones Facts';
const GET_FACT_MESSAGE = 'Here\'s is a fact about Game of Thrones Series:  ';
const HELP_MESSAGE = 'You can say tell me a Game of Thrones fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The G-O-T Facts skill can\'t help you with that.  It can help you discover unknown facts about the characters and plot of Game of Thrones if you say tell me a game of thrones fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const data = [
  'Charles Dance found Lord Tywins treatment of his son appalling. In fact, so appalling that Dance kept apologizing to Dinklage between takes.',
  'Peter Dinklage, who portrays Tyrion Lannister in the show, appears in more episodes than any other cast member. Dinklage is in total of 61 out of 67 episodes.',
  'While filming season 7 in Iceland, temperatures sometimes dropped down to -20°F (-28°C). Much of the cast had inadequate thermal underwear. Norwegian actor Kristofer Hivju, who plays Tormund Giantsbane, made sure that all of the cast members got merino wool underwear from Norwegian clothing company Devold.',
  'The Roman Emperor Caligula was a cruel and destructive ruler whose reign only lasted a few years because he was assassinated for being terrible at his job. And Joffrey looked a lot like him, judging by old statues and busts. Coincidence?',
  'The first season of "Game of Thrones" cost between $50 million and $60 million, or something north of $5 million per episode on average. Even now thats a lot for a TV show -- but HBO has blown past that amount and footed a bill of more than $100 million for Season 6. You can see where the extra funding has gone on the screen.',
  'Remember when Daenerys ate that horse heart in Season 1? After shooting that scene, actress Emilia Clarke was covered in so much fake blood (which commonly uses sticky corn syrup as a base) that she got stuck to a toilet.',
  'Writer George RR Martin had a cameo in that old pilot as a noble of Pentos who attended Daenerys wedding. The cameo didnt survive the reshoots.',
  'While many characters were given life through a tedious casting (and recasting!) process, only one actor was ever considered for the role of Tyrion Lannister. Peter Dinklage was George R.R. Martin, David Benioff, and D.B. Weisss first and only choice for Tywin Lannisters youngest son. And it was truly meant to be, as Peter Dinklage not only won a variety of awards including Emmy and Golden Globe, but he is forever burned into our minds as the god of wine',
  'A Game of Thrones-themed history course will examine the history and culture of the "medieval world" that the series relies on. Students will learn medieval history through the lens of one of TV’s biggest phenomena.',
  'Game of Thrones hit all the possible ratings and became the most pirated TV series of all time. A huge amount of people illegally downloaded the show from torrent sites. For several years in a row, Game of Thrones has topped the list of the most pirated shows.',
  'A replica of Gandalf’s sword from The Lord of the Rings and The Hobbit is forged inside the Iron Throne.',
  'The guy who plays Ramsay was the runner-up for Jon Snow.',
  'Madonna is actually another Game of Thrones fan, like all of us. She asked the directors of the show to lend her a famous Daenerys costume to celebrate the Jewish holiday of Purim.',
  'Ian Whyte has portrayed 4 characters in Game of Thrones: a White Walker, a nameless giant, Ser Gregor Clegane, and the giant Wun Wun.',
  'Michelle Fairley was very dramatic in portraying the strong and proud character Catelyn Stark. But there were few who noticed that she also played Hermione’s mother in the Harry Potter series.',
  'Most people considered Cersei’s Walk of Shame to be humiliating and horrible. Her grueling public shaming was based on a real-life incident. George R. R. Martin revealed that he was inspired by a case from medieval Britain: the mistress of King Edward IV was punished in this way after Edward died.',
  'Kit Harington and Rose Lesie, cast members who play Jon Snow and Ygritte, were wed to each other on June 23, 2018 in Scotland. They fell in love while playing the dynamic couple on-screen and he popped the question in September of 2017.',
  'Queen Cersei was fan-voted as the series most hated character. The actress who plays the role, Lena Headey, said that the fans hatred for the character often translates to her personally as people at times insult or shun her in real life. While there are plenty of people who adore her and her portrayal of Cersei, Headey reported that during an autograph session at Comic Con, people would snatch their books from her hands to prevent her from signing it.',
  'With millions of dollars spent per episode, its no longer a surprise that everything about the show is expensive. Even the petrified dragon eggs that appear briefly in season 1 before being hatched into majestic beasts are a complete work of art. Worthy enough to serve as a wedding gift to the book author George R. R. Martin as one of the three was gifted to him to celebrate his marriage to a longtime partner Parris McBride.',
  'In sharp contrast to his turn as sadistic Joffrey, everyone on the show describes actor Jack Gleeson as a warm and friendly person. He is also good friends with Sophie Turner, who he often has to antagonize on-screen.',
  'The actor behind Melisandre, Carice van Houten, could have played Cersei Lannister. She was asked to audition for the role of the queen, but was unable to because she was filming Intruders.',
  'The Red Woman was almost the Lion Queen.',
  'In real life, Tyrion and Cersei actually like each other. In fact, the actors who play them, Peter Dinklage and Lena Headey, are good friends!'

];



const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'gotintent');
  },
  handle(handlerInput) {
    const randomFact = cookbook.getRandomItem(data);
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();