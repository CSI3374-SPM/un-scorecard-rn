//import list/map from wrapper
//add survey to list/map

export type Question = {
  question: string;
  justification: string;
  descriptions: string[];
};

export const makeQuestion = (q: string, j: string, d: string[]): Question => {
  return {
    question: q,
    justification: j,
    descriptions: d,
  };
};

export type Survey = {
  questions: Question[];
  //language: string;
  //surveyType: string;
};
/*
export const makeSurvey = (q: Question[], l: string, s: string): Survey => {
  return {
    questions: q,
    language: l,
    surveyType: s,
  };
};
*/

export const makeSurvey = (q: Question[]): Survey => {
  return {
    questions: q,
  };
};
export const generateUSDASurvey = (): Survey => {
  return makeSurvey(usdaQuestions);
};
export const generateWHOSurvey = (surveyLanguage: string): Survey => {
  console.log("Survey language in Survey component: ", surveyLanguage);

  if (surveyLanguage == "eng") {
    return makeSurvey(demoQuestions);
  } else if (surveyLanguage == "ja") {
    console.log("Entered japanese making statement");
    return makeSurvey(englishQuestions);
  }
  return makeSurvey(englishQuestions);
};

export const usdaQuestions = [
  makeQuestion(
    "A1.1 To what extent does/do the governance mechanism(s) for disaster risk management integrate the full breadth of food availability and access needs?",
    "Optional: Please provide justification for answer A1.1",
    [
      "5 – The full spectrum of food availability and access functions routinely provide input to disaster resilience governance mechanism/meetings, and routinely contribute to all major disaster resilience programs and documents. (Participation may be through a nominated focal point combining input from many disciplines).",
      "4 – Representatives of most food sector functions usually attend major city disaster resilience meetings and contribute to major programs, but they may not be involved in all relevant activity.",
      "3 – Food availability and security functions have their own disaster resilience fora and mechanisms but, while including the full spectrum of functions, these are not thoroughly coordinated with other actors such as city governments, logistics operators or community groups. The focus may be narrowly on immediate event response, rather than broader resilience issues such as longer run impacts.",
      "2 – Some food sector disciplines are involved in some city disaster resilience activities, but there is not complete engagement.",
      "1 – Only rudimentary engagement of food availability and access disciplines in city disaster resilience activities exists.",
      "0 – There is no food availability and access functions in the region, or if there is, it is not engaged in disaster resilience at all.",
    ]
  ),
  makeQuestion(
    "A1.2 To what extent did the governance mechanism(s) for disaster risk management integrate the emergency meals-to-you program during the COVID-19 response?",
    "Optional: Please provide justification for answer A1.2",
    [
      "5 – The full spectrum of emergency meals-to-you program functions were engaged in relevant COVID-19 meetings, and routinely contributed to broader pandemic response and recovery programs and documents. (Participation may be through a nominated focal point combining input from many disciplines).",
      "4 – Representatives of emergency meals-to-you program usually attended major local COVID-19 meetings and but were not involved in all relevant activities.",
      "3 – The emergency meals-to-you program had their own mechanisms but, while including the full spectrum of functions, these are were not thoroughly coordinated with other actors such as city governments, logistics operators or community groups. The focus may be narrowly on immediate event response.",
      "2 – Some emergency meals-to-you program functions were involved in some city disaster resilience activities, but there is not complete engagement.",
      "1 – Only rudimentary engagement of the emergency meals-to-you program in local COVID-19 activities.",
      "0 – There was no engagement of emergency meals-to-you functions in the region, or if there is, it is not engaged in COVID-19 activities.",
    ]
  ),
  makeQuestion(
    "A2.1 To what extent is food availability and access included in disaster risk planning for disease outbreaks, pandemics, water shortages and other events?",
    "Optional: Please provide justification for answer A2.1",
    [
      "5 – Food availability and access emergencies are fully included as a risk scenario in their own right, or as a component of a “composite” scenario. The likely impact on staff availability and food supply is modelled and planned for, both alone, and in combination with other risks where an epidemic or pandemic may hinder ability to respond.",
      "4 – Food availability and access barriers are addressed as above, but they tend to be considered in isolation from other risks, and thus the interaction with other risks may not be fully addressed.",
      "3 – Food availability and access is considered along with their likely impacts, but these impacts are not fully modelled.",
      "2 – Food security and access may be considered, but at a high level only.",
      "1 – Risk of food availability and access may be noted as an issue, but without active consideration of the impacts or required responses.",
      "0 – No consideration of food availability and access at all.",
    ]
  ),
  makeQuestion(
    "A2.2 To what extent is food supply chain and logistical impacts included in scenario planning for disasters such as a flood, hurricane, tornado, or earthquake?",
    "Optional: Please provide justification for answer A2.2",
    [
      "5 – A comprehensive set of food supply chain and logistical impacts fully included in disaster planning scenarios. The likely impact on staff availability, food facilities, water and sanitation, treatment and care are planned for and modelled.",
      "4 – Food supply chain and logistical impacts are fully addressed as above, but they tend to be considered in isolation from other impacts, and thus the effect that they may have on disaster recovery is not fully assessed.",
      "3 – A number of food supply chain and logistical issues are addressed, perhaps in detail, but there is not full coverage. Longer term issues  are likely to be omitted.",
      "2 – Some immediate food supply chain and logistical impacts post-disaster are considered and planned for, but in an outline treatment only.",
      "1 – Food supply chain and logistical issues may be acknowledged, but without real planning for these.",
      "0 – No consideration of food supply chain and logistical impacts post-disaster issues at all.",
    ]
  ),
  makeQuestion(
    "A2.3 To what extent are pre-existing chronic health issues and nutritional needs included in disaster scenarios where food availability and access are likely to impede recovery?",
    "Optional: Please provide justification for answer A2.3",
    [
      "5 – Disaster planning for food access and availability comprehensively reviewed and included pre-existing chronic health issues such as obesity and other childhood maladies, and nutritional needs.",
      "4 – Broadly, pre-existing chronic health issues, obesity and other childhood maladies, and nutritional needs are identified and included in food availability and access disaster planning.",
      "3 – Most applicable pre-existing chronic health issues, obesity and other childhood maladies, and nutritional needs and considerations are included in food availability and access disaster planning, with some gaps.",
      "2 – Pre-existing chronic health issues, obesity and other childhood maladies, and nutritional needs are known but not included in food availability and access disaster planning.",
      "1 – Major gaps exist in identification and inclusion of pre-existing chronic health issues, obesity and other childhood maladies, and nutritional needs.",
      "0 – No attempt to identify or consider pre-existing chronic health issues, obesity and other childhood maladies, and nutritional needs.",
    ]
  ),
  makeQuestion(
    "A3.1 To what extent is emergency and regular funding identified and available to address food availability and access risks and impacts of disasters?",
    "Optional: Please provide justification for answer A3.1",
    [
      "5 – Funding (emergency and regular) is identified and accessible to address all known food availability and access implications.",
      "4 – Funding (emergency and regular) is identified and accessible to address all known food availability and access implications from the most probable scenario.",
      "3 – Funding needs are known but some funding shortfalls are known to exist. These are actively being addressed.",
      "2 – Needs are not fully known, and where they are, some shortfalls are identified. Addressing them may or may not be in hand.",
      "1 – Food availability and access funding needs have only been assessed in outline, and only a generalized knowledge of funding sources is available. These have not been pursued.",
      "0 – No consideration of funding needs or sources.",
    ]
  ),
  makeQuestion(
    "A4.1 To what extent are key food sector facilities located and built in a manner that will allow them to continue to be operational after a disaster?",
    "Optional: Please provide justification for answer A4.1",
    [
      "5 – All key food sector facilities are in locations and conform to codes that will allow them to survive in the “most severe” disaster scenario.",
      "4 – All key food sector facilities are in locations and conform to codes that will allow them to survive in the “most probable” disaster scenario.",
      "3 – Some key food sector facilities are not in locations or fail to conform to codes that will allow them to survive in the “most probable” disaster scenario.",
      "2 – More than 50% of key food sector facilities are not in locations or fail to conform to codes that will allow them to survive in the “most probable” disaster scenario.",
      "1 – More than 75% of key food sector facilities are not in locations or fail to conform to codes that will allow them to survive in the “most probable” disaster scenario.",
      "0 – No assessment carried out.",
    ]
  ),
  makeQuestion(
    "A5.1 To what extent are ecosystem services that provide food availability and access benefits identified and protected?",
    "Optional: Please provide justification for answer A5.1",
    [
      "5 – All food sector relevant ecosystem services are identified, protected and known to be thriving.",
      "4 – All food relevant ecosystem services are identified and in theory protected but may not be thriving.",
      "3 – Some but not all food relevant ecosystem services are identified. Those that are identified are protected in theory but may not be thriving.",
      "2 – Widespread gaps in identification and protection of food relevant ecosystem services. Significant issues with the health of some of those ecosystem services that are monitored.",
      "1 – Rudimentary efforts to identify and protect food relevant ecosystem services. Widespread issues with the status and health of those that are identified.",
      "0 – No attempt to identify or protect food relevant ecosystem services and high probability that they would be assessed to be severely degraded if they were formally identified.",
    ]
  ),
  makeQuestion(
    "A6.1 To what extent are the relevant food sector workforce, competencies and skills required to maintain food  access available to the city?",
    "Optional: Please provide justification for answer A6.1",
    [
      "5 – All relevant food sector workforce competencies and skills identified and assessed to be adequate for disaster planning, service delivery and post disaster recovery, both in terms of skill depth and numbers.",
      "4 – All relevant food sector skills identified, and some minor shortfalls known to exist in certain skillsets or numbers thereof.",
      "3 – All relevant food sector skills identified, and more significant shortfalls known to exist in depth and numbers.",
      "2 – Incomplete food sector skills identification and significant shortfalls in those that are known, in depth and numbers.",
      "1 – Rudimentary attempt at food sector skill identification – shortfalls in depth and numbers suspected to be universal.",
      "0 – No consideration given to the issue.",
    ]
  ),
  makeQuestion(
    "A6.2 To what extent are food availability and access data on vulnerabilities and capacities shared with other stakeholders who need it?",
    "Optional: Please provide justification",
    [
      "5 – Relevant food availability and access data items are identified; quality data is reliably distributed to all stakeholders who need it, including the public as applicable.",
      "4 – All key food availability and access data items and feeds identified, and quality data is reliably distributed to most stakeholders, including the public as applicable.",
      "3 – Most food availability and access data items are identified and distributed, but it may be of lower quality and reliability to a limited subset of stakeholders.",
      "2 – Some food availability and access data items and feeds distributed to one or two stakeholders only; quality and reliability known to be an issue.",
      "1 – Rudimentary food availability and access data identification and distribution – erratic and unreliable even where provided.",
      "0 – No food availability and security data identified or distributed.",
    ]
  ),
  makeQuestion(
    "A7.1 To what extent do communities understand and are able to fulfill their roles in maintaining food availability and access before, during and after a disaster?",
    "Optional: Please provide justification",
    [
      "5 – Each community or neighborhood understands, accepts and is able to execute the role expected of it before, during and after a disaster, with a designated organization to lead this food availability and access related work.",
      "4 – 90% of communities understand, accept and are able to execute the role expected of them.",
      "3 – 75% of communities have a broad understanding and are able to execute key elements of their role.",
      "2 – Half or less of communities understand their role and in these cases are able to execute only part of it.",
      "1 – There is only rudimentary community level understanding across the city pertaining to food availability and access, and very little ability to execute.",
      "0 – Community level role is not really defined or communicated. Ability to execute not known.",
    ]
  ),
  makeQuestion(
    "A7.1.2 To what extent did communities receive and act upon the emergency meals-to-you program?",
    "Optional: Please provide justification",
    [
      "5 – The Emergency Meals-to-You program was universally received, accepted and acted upon.",
      "4 – The Emergency Meals-to-You program was broadly received, accepted and acted upon.",
      "3 – Some communities or other sub-groups may not have received, accepted or acted upon the Emergency Meals-to-You program.",
      "2 – More than 50% of the community many not have received, accepted or acted upon the Emergency Meals-to-You program .",
      "1 – There was only scattered receipt and acceptance of the Emergency Meals-to-You program.",
      "0 – No attempt to convey information about the Emergency Meals-to-You program.",
    ]
  ),
  makeQuestion(
    "A7.2 To what extent could the communities’ food availability and access needs be addressed by the Emergency Meals-to-You program?",
    "Optional: Please provide justification",
    [
      "5 – Community organization(s) and schools are equipped to support the delivering and implementation of the Emergency Meals-to-You program.",
      "4 – >75% of neighborhoods could be covered. Community support groups and schools available.",
      "3 – >50–75% of neighborhoods could be covered.",
      "2 – >25–50% of neighborhoods could be covered.",
      "1 –Neighborhoods would need to be engaged to support implementation.",
      "0 – Not required in a pandemic or disaster.",
    ]
  ),
  makeQuestion(
    "A8.1 To what extent is food availability and access infrastructure resilient?",
    "Optional: Please provide justification",
    [
      "5 – All food availability and access infrastructure – including the services on which it depends – is rated capable of dealing with “most severe” scenario with minimal loss of service.",
      "4– All food availability and access infrastructure – including the services on which it depends – is rated capable of dealing with “most probable” scenario with minimal loss of service.",
      "3 – Food availability and access infrastructure would be significantly disrupted in a “most severe” scenario, but some service would continue for 75% of the population. It would mitigate most of “most probable” scenario, however.",
      "2 – Food availability and access infrastructure would be significantly disrupted in “most probable” scenario but some service would continue for 75% of the population; and 50% for “most severe” scenario.",
      "1 – Food availability and access infrastructure would be significantly disrupted or shut down for 50% of the population. It would effectively cease to operate under “most severe” scenario.",
      "0 – No food availability and security infrastructure besides hospitals to begin with.",
    ]
  ),
  makeQuestion(
    "A8.2 To what extent are emergency systems able to handle a sudden demand in food availability and access?",
    "Optional: Please provide justification",
    [
      "5 – Surge capacity exists to deal with additional food availability and access needs likely to arise from “most severe” scenario and is tested either via actual events or practice drills – can be activated within 6 hours.",
      "4 – Surge capacity exists to deal with additional food availability and access needs likely to arise from “most probable” scenario and is tested either via actual events or practice drills – can be activated within 6 hours.",
      "3 – Surge capacity exists but is known or suspected to have minor inadequacies relative to “most probable” scenario – can be activated within 6 hours. Under “most severe” scenario, more significant shortcomings in geographical coverage or type of service available and can only be activated within 12 hours or longer.",
      "2 – Surge capacity exists but is known to have more significant shortcomings in geographical coverage or type of service available and can only be activated within 12 hours or longer. Surge capacity has never been assessed for “most severe” scenario.",
      "1 – Surge capacity is theoretically available but has never been assessed or tested for “most probable” scenario.",
      "0 – No surge capacity identified.",
    ]
  ),
  makeQuestion(
    "A8.3 To what extent can the required infrastructure be maintained to continue food service delivering at schools before, during and after a disaster?",
    "Optional: Please provide justification",
    [
      "5 – Food service delivery to schools could be maintained at the school in “most severe” disaster scenario. If services need to be moved, transportation facilities and routes are known to have required capacity and resilience.",
      "4 – Food service delivery could be maintained at the school in “most probable” disaster scenario. If services need to be moved, transportation facilities and routes are known to have required capacity and resilience.",
      "3 – Some impacts under “most probable” scenario on food service delivery. Movement of some services likely to be problematic. Movement of many school food services likely to be problematic.",
      "2 – More widespread impacts under “most probable” disaster scenario. Movement of many services likely to be problematic. Serious impacts under “most severe” scenario on food service delivery, with movement likely to be possible only in the most urgent situation.",
      "1 – Serious impacts under “most probable” disaster scenario on food service delivery at schools with movement likely to be possible only in most urgent cases. Under “most severe” scenario, foo services would fail completely.",
      "0 – Food service delivery to students would fail completely or almost completely under “most probable” disaster scenario.",
    ]
  ),
  makeQuestion(
    "A9.1 To what extent do early warning systems exist for impending food availability and access emergencies?",
    "Optional: Please provide justification",
    [
      "5 – Comprehensive and effective monitoring exists and will deliver effective early warnings to address the impacts for all food availability and access hazards. They will allow time for reaction (as far as technology permits). Warnings are seen as reliable and specific to the city.",
      "4 – Comprehensive monitoring exists even if it is not fully effective in all cases. Warnings exist but warning time maybe less than technology currently permits. Warnings are seen as reliable and specific.",
      "3 – Monitoring exists for most likely food availability and access risks and is broadly effective, but one or more key risks is not covered. Some hazards are excluded, and warning time may be less than technology permits.",
      "2 – Some monitoring exists but has significant gaps. Warning time is less than technology permits and there may also be some false positives: reliability of warnings may therefore be perceived as questionable.",
      "1 – Monitoring is rudimentary at best and may not deliver warnings. Warnings seen as ad hoc and unreliable. Likely to be ignored.",
      "0 – No monitoring or warnings.",
    ]
  ),
  makeQuestion(
    "A9.2 To what extent are food sector and professionals integrated with the emergency management team?",
    "Optional: Please provide justification",
    [
      "5 – The food sector is fully represented and engaged on the emergency management team and integrated into all emergency decision taking. Engagement has been tested via drills (within the last year) or live response.",
      "4 – Food availability and access is integrated but via remote input (phone, messaging). Engagement has been tested, but maybe more than 12 months ago.",
      "3 – Food availability and access is represented but engagement has not been tested in 3 years; or represented, but some key disciplines are omitted.",
      "2 – Disaster management processes provide for food availability and security to be consulted, but in the follow-up to events, not as they happen. No testing of processes.",
      "1 – Disaster management relies on ad hoc phone calls to food sector professionals and facilities.",
      "0 – Food availability and security is effectively disengaged from disaster management.",
    ]
  ),
  makeQuestion(
    "A9.3 To what extent can supply items and equipment required to maintain food availability and access be provided during and after a disaster.",
    "Optional: Please provide justification",
    [
      "5 – A comprehensive list of required items exists, and tested plans are known to be adequate to deliver them rapidly to the entire population.",
      "4 – A list exists but it may not be comprehensive, and plans may not be tested or fully adequate for the entire city.",
      "3 – A list exists, and key items will be available to 75% of the population.",
      "2 – No list but stockpiles and supplies exist for some items. Distribution capability may reach 50% of the population.",
      "1 – Some stocks of key items exist but no attempt to plan these, and distribution mechanism unlikely to be successful even if it exists at all.",
      "0 – No attempt to address this issue.",
    ]
  ),
  makeQuestion(
    "A10.1 To what extent do comprehensive post event food availability and access plans exist?",
    "Optional: Please provide justification",
    [
      "5 – Fully comprehensive plans exist addressing longer term food availability and access needs after “most probable” and “most severe” scenario.",
      "4 – Fully comprehensive plans exist addressing longer term food availability and access needs after “most probable” scenario.",
      "3 – Plans exist for post “most probable” event but with some shortfalls. More significant shortfalls for “most severe” scenario.",
      "2 – Plans exist for post “most probable” event but with more significant shortfalls. Generalized inadequacy for “most severe” scenario.",
      "1 – Plans exist for post “most probable” event but with generalized inadequacy.",
      "0 – No plan.",
    ]
  ),
  makeQuestion(
    "A10.2 To what extent do formalized mechanisms to learn from performance of the food sector systems before, during and after disasters exist?",
    "Optional: Please provide justification",
    [
      "5 – Defined learning mechanism exists that integrates food availability and access with other lessons and has been used with demonstrable results.",
      "4 – Defined learning mechanism exists that integrates food availability and access with other lessons but has not yet been used – no disasters.",
      "3 – Learning will take place via a food availability and access review mechanism, but it is unilateral or bilateral only – lessons remain within functional food sector stovepipe and there is no attempt to integrate food availability and access learnings with other disciplines within the city. Likewise, food availability and security fails to influence learnings in other services.",
      "2 – No real defined mechanism, but ad hoc learning exercises either have been used or may be expected in future disasters.",
      "1 – Scattered and fleeting attempts to learn and improve in the past have occurred or are anticipated in the future.",
      "0 – No attempt to learn and improve.",
    ]
  ),
];

const demoQuestions = [
  makeQuestion(
    "A1.1 To what extent does/do the governance mechanism(s) for disaster risk management integrate the full breadth of public health considerations?",
    "Option: please provide justification for answer A1.1",
    [
      "5 - The full spectrum of public health functions routinely provide input to the city's disaster resilience governance mechanism/meetings, and routinely contribute to all major disaster resilience programs and documents. (Participation may be through a nominated focal point combining input from many disciplines). ",
      "4 - Representatives of most public health functions usually attend major city disaster resilience meetings and contribute to major programs, but they may not be involved in all relevant activity. ",
      "3 - Public health functions have their own disaster resilience fora and mechanisms but, while including the full spectrum of functions, these are not thoroughly coordinated with other actors such as city governments, logistics operators or community groups. The focus may be narrowly on immediate event response, rather than broader resilience issues such as longer run impacts.",
      "2 - Some public health disciplines are involved in some city disaster resilience activities, but there is not complete engagement.",
      "1 - Only rudimentary engagement of public health disciplines in city disaster resilience activities exists. ",
      "0 - There is no public health function in the region, or if there is, it is not engaged in disaster resilience at all.",
    ]
  ),
  makeQuestion(
    "A2.1 To what extent are emergencies and disasters including disease outbreaks are included in disaster risk planning? ",
    "Option: please provide justification for answer A2.1",
    [
      '5 - Emergencies and disasters including disease outbreaks are fully included by the city either as a risk scenario in their own right, or as a component of a "composite" scenario. The likely impact on staff availability and on health facilities is modelled and planned for, both alone, and in combination with other risks where an epidemic or pandemic may hinder ability to respond. ',
      "4 - Emergencies and disasters including disease outbreaks are addressed as above, but they tend to be considered in isolation from other risks, and thus the interaction with other risks may not be fully addressed. ",
      "3 - Emergencies and disasters including outbreaks are considered along with their likely impacts, but these impacts are not fully modelled. ",
      "2 - Emergencies and disasters including outbreaks may be considered, but at a high level only.",
      "1 - Risk of outbreaks may be noted as an issue, but without active consideration of the impacts or required responses. ",
      "0 - No consideration of pandemics at all. ",
    ]
  ),
  makeQuestion(
    "A2.2 To what extent are public health impacts included in the city's scenario planning for other disaster risks? ",
    "Option: please provide justification for answer A2.2",
    [
      "5 - A comprehensive set of disaster health issues is fully included in its disaster planning scenarios. The likely impact on staff availability, health facilities, water and sanitation, treatment and care is planned for and modelled, including immediate impact and for long-term physical and psychological health issues. ",
      "4 - Disaster health issues are fully addressed as above, but they tend to be considered in isolation from other impacts, and thus the effect that they may have on disaster recovery is not fully assessed. ",
      "3 - A number of disaster health issues are addressed, perhaps in detail, but there is not full coverage. Longer term issues physical and mental health issues are likely to be omitted. ",
      "2 - Some immediate post-disaster health issues are considered and planned for, but in an outline treatment only. ",
      "1 - Disaster health issues may be acknowledged, but without real planning for these. ",
      "0 - No consideration of post-disaster health issues at all. ",
    ]
  ),
  makeQuestion(
    "A2.3 To what extent are pre-existing chronic health issues included in scenarios where disasters are likely to exacerbate these, or where they are likely to impede recovery? ",
    "Option: please provide justification for answer A2.3",
    [
      "5 - Chronic health conditions are comprehensively reviewed and included in scenario definition and planning; OR no stresses are thought to apply. ",
      "4 - Broadly, chronic health conditions are identified and included in scenario definition and planning. ",
      "3 - Most applicable chronic health conditions are included in scenario definition or planning, with some gaps. ",
      "2 - Chronic health conditions are known but not included in scenario definition and planning. ",
      "1 - Major gaps exist in identification and inclusion of chronic health stresses.",
      "0 - No attempt to identify or consider chronic health conditions.",
    ]
  ),
];

export const englishQuestions = [
  makeQuestion(
    "A1.1 To what extent does/do the governance mechanism(s) for disaster risk management integrate the full breadth of public health considerations?",
    "Optional: please provide justification for answer A1.1",
    [
      "5 - The full spectrum of public health functions routinely provide input to the city's disaster resilience governance mechanism/meetings, and routinely contribute to all major disaster resilience programs and documents. (Participation may be through a nominated focal point combining input from many disciplines). ",
      "4 - Representatives of most public health functions usually attend major city disaster resilience meetings and contribute to major programs, but they may not be involved in all relevant activity. ",
      "3 - Public health functions have their own disaster resilience fora and mechanisms but, while including the full spectrum of functions, these are not thoroughly coordinated with other actors such as city governments, logistics operators or community groups. The focus may be narrowly on immediate event response, rather than broader resilience issues such as longer run impacts.",
      "2 - Some public health disciplines are involved in some city disaster resilience activities, but there is not complete engagement.",
      "1 - Only rudimentary engagement of public health disciplines in city disaster resilience activities exists. ",
      "0 - There is no public health function in the region, or if there is, it is not engaged in disaster resilience at all.",
    ]
  ),
  makeQuestion(
    "A2.1 To what extent are emergencies and disasters including disease outbreaks are included in disaster risk planning? ",
    "Optional: please provide justification for answer A2.1",
    [
      '5 - Emergencies and disasters including disease outbreaks are fully included by the city either as a risk scenario in their own right, or as a component of a "composite" scenario. The likely impact on staff availability and on health facilities is modelled and planned for, both alone, and in combination with other risks where an epidemic or pandemic may hinder ability to respond. ',
      "4 - Emergencies and disasters including disease outbreaks are addressed as above, but they tend to be considered in isolation from other risks, and thus the interaction with other risks may not be fully addressed. ",
      "3 - Emergencies and disasters including outbreaks are considered along with their likely impacts, but these impacts are not fully modelled. ",
      "2 - Emergencies and disasters including outbreaks may be considered, but at a high level only.",
      "1 - Risk of outbreaks may be noted as an issue, but without active consideration of the impacts or required responses. ",
      "0 - No consideration of pandemics at all. ",
    ]
  ),
  makeQuestion(
    "A2.2 To what extent are public health impacts included in the city's scenario planning for other disaster risks? ",
    "Optional: please provide justification for answer A2.2",
    [
      "5 - A comprehensive set of disaster health issues is fully included in its disaster planning scenarios. The likely impact on staff availability, health facilities, water and sanitation, treatment and care is planned for and modelled, including immediate impact and for long-term physical and psychological health issues. ",
      "4 - Disaster health issues are fully addressed as above, but they tend to be considered in isolation from other impacts, and thus the effect that they may have on disaster recovery is not fully assessed. ",
      "3 - A number of disaster health issues are addressed, perhaps in detail, but there is not full coverage. Longer term issues physical and mental health issues are likely to be omitted. ",
      "2 - Some immediate post-disaster health issues are considered and planned for, but in an outline treatment only. ",
      "1 - Disaster health issues may be acknowledged, but without real planning for these. ",
      "0 - No consideration of post-disaster health issues at all. ",
    ]
  ),
  makeQuestion(
    "A2.3 To what extent are pre-existing chronic health issues included in scenarios where disasters are likely to exacerbate these, or where they are likely to impede recovery? ",
    "Optional: please provide justification for answer A2.3",
    [
      "5 - Chronic health conditions are comprehensively reviewed and included in scenario definition and planning; OR no stresses are thought to apply. ",
      "4 - Broadly, chronic health conditions are identified and included in scenario definition and planning. ",
      "3 - Most applicable chronic health conditions are included in scenario definition or planning, with some gaps. ",
      "2 - Chronic health conditions are known but not included in scenario definition and planning. ",
      "1 - Major gaps exist in identification and inclusion of chronic health stresses.",
      "0 - No attempt to identify or consider chronic health conditions.",
    ]
  ),
  makeQuestion(
    "A3.1 To what extent is funding identified and available to address public health risks and impacts of disasters? ",
    "Optional: please provide justification for answer A3.1",
    [
      "5 - Funding is identified and accessible to address all known health implications from the most severe scenario in Essential 2. ",
      "4 - Funding is identified and accessible to address all known health implications from the most probable scenario in Essential 2. ",
      "3 - Funding needs are known but some funding shortfalls are known to exist. These are actively being addressed. ",
      "2 - Needs are not fully known, and where they are, some shortfalls are identified. Addressing them may or may not be in hand. ",
      "1 - Health funding needs have only been assessed in outline, and only a generalized knowledge of funding sources is available. These have not been pursued.",
      "0 - No consideration of funding needs or sources. ",
    ]
  ),
  makeQuestion(
    "A4.1 To what extent are key health facilities located and built in a manner that will allow them to continue to be operational after a disaster? ",
    "Optional:  please provide justification for answer A4.1",
    [
      '5 - All key public health facilities (see right) are in locations and conform to codes that will allow them to survive in the "most severe" disaster scenario. ',
      '4 - All key public health facilities are in locations and conform to codes that will allow them to survive in the "most probable" disaster scenario. ',
      '3 - Some key public health facilities are not in locations or fail to conform to codes that will allow them to survive in the "most probable" disaster scenario. ',
      '2 - More than 50% of key public health facilities are not in locations or fail to conform to codes that will allow them to survive in the "most probable" disaster scenario. ',
      '1 - More than 75% of key public health facilities are not in locations or fail to conform to codes that will allow them to survive in the "most probable" disaster scenario. ',
      "0 - No assessment carried out. ",
    ]
  ),
  makeQuestion(
    "A5.1 To what extent are ecosystem services that provide public health benefits identified and protected? ",
    "Optional: please provide justification for answer A5.1",
    [
      "5 - All relevant ecosystem services are identified, protected and known to be thriving. ",
      "4 - All relevant ecosystem services are identified and in theory protected but may not be thriving. ",
      "3 - Some but not all relevant ecosystem services are identified. Those that are identified are protected in theory but may not be thriving. ",
      "2 - Widespread gaps in identification and protection of relevant ecosystem services. Significant issues with the health of some of those ecosystem services that are monitored. ",
      "1 - Rudimentary efforts to identify and protect relevant ecosystem services. Widespread issues with the status and health of those that are identified. ",
      "0 - No attempt to identify or protect relevant ecosystem services and high probability that they would be assessed to be severely degraded if they were formally identified. ",
    ]
  ),
  makeQuestion(
    "A6.1 To what extent are the workforce, competencies and skills required to plan and maintain public health systems and services for disaster resilience available to the city? ",
    "Optional: please provide justification for answer A6.1",
    [
      "5 - All relevant workforce competencies and skills identified and assessed to be adequate for disaster planning, health services and post disaster recovery, both in terms of skill depth and numbers.",
      "4 - All relevant skills identified, and some minor shortfalls known to exist in certain skillsets or numbers thereof.",
      "3 - All relevant skills identified, and more significant shortfalls known to exist in depth and numbers. ",
      "2 - Incomplete skills identification and significant shortfalls in those that are known, in depth and numbers. ",
      "1 - Rudimentary attempt at skill identification – shortfalls in depth and numbers suspected to be universal. ",
      "0 - No consideration given to the issue. ",
    ]
  ),
  makeQuestion(
    "A6.2 To what extent is public health data on health vulnerabilities and capacities, as well as risks and early warning of outbreaks shared with other stakeholders who need it? ",
    "Optional: please provide justification for answer A6.2",
    [
      "5 - Relevant public health data and feeds are identified; quality data is reliably distributed to all stakeholders who need it, including the public as applicable. ",
      "4 - All key public health data items and feeds identified, and quality data is reliably distributed to most stakeholders, including the public as applicable. ",
      "3 - Most data items and feeds identified and distributed, but it may be of lower quality and reliability to a limited subset of stakeholders. ",
      "2 - Some data items and feeds distributed to one or two stakeholders only; quality and reliability known to be an issue. ",
      "1 - Rudimentary data identification and distribution – erratic and unreliable even where provided. ",
      "0 - No public health data identified or distributed.",
    ]
  ),
  makeQuestion(
    "A6.2.1 To what extent is data from other critical systems shared with public health system stakeholders who need it? ",
    "Optional: please provide justification for answer A6.2.1",
    [
      "5 - Relevant data and feeds for other critical systems are identified; quality data is reliably distributed to all public health stakeholders who need it. ",
      "4 - All key data items and feeds are identified, and quality data is reliably distributed to most public health stakeholders. ",
      "3 - Most data items and feeds identified and distributed, but it may be of lower quality and reliability to a limited subset of public health stakeholders. ",
      "2 - Some data items and feeds distributed to one or two public health stakeholders only; quality and reliability known to be an issue. ",
      "1 - Rudimentary data identification and distribution - erratic and unreliable even where provided. ",
      "0 - No critical system data identified or distributed to public health stakeholders. ",
    ]
  ),
  makeQuestion(
    "A6.2.2 To what extent are individuals' health and prescription records protected from a disaster, and accessible in the aftermath of a disaster? ",
    "Optional: please provide justification for answer A6.2.2",
    [
      "5 - All citizen health records (health conditions, prescription records) are safe, and also accessible by emergency response workers (for example those providing healthcare in shelters, hospitals where people may be taken if injured). ",
      "4 - Citizen health records are mostly safe and accessible with some minor exceptions, for example those relating to some health specialists, or those of some small segment of the outlying population. ",
      "3 - Health records are mostly safe but may not be accessible due to communications issues that can be anticipated after a disaster. ",
      "2 - More significant gaps in securing of health records. ",
      "1 - Major gaps - data is likely to be lost for large segments of the population. ",
      "0 - No attempt to ensure safety or accessibility of health records",
    ]
  ),
  makeQuestion(
    "A7.1 To what extent do communities understand and are able to fulfil their roles in maintaining public health and well-being levels before, during and after a disaster? ",
    "Optional: please provide justification for answer A7.1",
    [
      "5 - Each community or neighborhood in the city understands, accepts and is able to execute the role expected of it before, during and after a disaster, with a designated organization to lead this work.",
      "4 - 90% of communities understand, accept and are able to execute the role expected of them. ",
      "3 - 75% of communities have a broad understanding and are able to execute key elements of their role. ",
      "2 - Half or less of communities understand their role and in these cases are able to execute only part of it. ",
      "1 - There is only rudimentary community level understanding across the city of public health role, and very little ability to execute. ",
      "0 - Community level role is not really defined or communicated. Ability to execute not known. ",
    ]
  ),
  makeQuestion(
    "A7.1.2 To what extent do communities receive, respect and are willing to act upon public health information? ",
    "Optional: please provide justification for answer A7.1.2",
    [
      "5 - Public health advice has been shown in prior disasters to be universally received, accepted and acted upon. ",
      "4 - Public health advice would be expected to be broadly received, accepted and acted upon. ",
      "3 - Some communities or other sub-groups may fail to receive, accept or act upon public health information. ",
      "2 - More than 50% of the city may fail to receive, accept or act upon important public health information after a disaster.",
      "1 - There is only scattered receipt and acceptance of public health information. ",
      "0 - No attempt to convey public health information. ",
    ]
  ),
  makeQuestion(
    "A7.2 To what extent are communities' mental health needs addressed? ",
    "Optional: please provide justification for answer A7.2",
    [
      "5 - Community organization(s), psychosocial support, schools, psychological trauma centers, and counsellors exist and are equipped to address full spectrum of mental health for every neighborhood, irrespective of wealth, age, demographics, etc. ",
      "4 - >75% of neighborhoods covered. Community support groups and trauma centers available. ",
      "3 - >50-75% of neighborhoods covered. ",
      "2 - >25-50% of neighborhoods covered. ",
      "1 - Plans to engage neighborhoods exist but have not been implemented except in maybe one or two initial cases. ",
      "0 - No mental health needs addressed. ",
    ]
  ),
  makeQuestion(
    "A8.1 To what extent is public health infrastructure (besides hospitals) resilient?",
    "Optional: please provide justification for answer A8.1",
    [
      '5 - All public health infrastructure - including the services on which it depends - is rated capable of dealing with "most severe”" scenario with minimal loss of service. ',
      '4 - All public health infrastructure - including the services on which it depends - is rated capable of dealing with "most probable" scenario with minimal loss of service. ',
      '3 - Public health infrastructure would be significantly disrupted in a "most severe" scenario, but some service would continue for 75% of the population of the city. It would mitigate most of "most probable" scenario, however. ',
      '2 - Public health infrastructure would be significantly disrupted in "most probable" scenario but some service would continue for 75% of the population of the city; and 50% for "most severe" scenario. ',
      '1 - Public health infrastructure would be significantly disrupted or shut down for 50% of the population of the city or more. It would effectively cease to operate under "most severe" scenario. ',
      "0 - No public health infrastructure besides hospitals to begin with. ",
    ]
  ),
  makeQuestion(
    "A8.2 To what extent are hospitals and emergency care centers able to manage a sudden influx of patients? ",
    "Optional: please provide justification for answer A8.2",
    [
      '5 - Surge capacity exists to deal with additional health needs likely to arise from "most severe" scenario and is tested either via actual events or practice drills - can be activated within 6 hours. ',
      '4 - Surge capacity exists to deal with additional health needs likely to arise from "most probable" scenario and is tested either via actual events or practice drills - can be activated within 6 hours. ',
      '3 - Surge capacity exists but is known or suspected to have minor inadequacies relative to "most probable" scenario - can be activated within 6 hours. Under "most severe" scenario, more significant shortcomings in geographical coverage or type of service available and can only be activated within 12 hours or longer. ',
      "2 - Surge capacity exists but is known to have more significant shortcomings in geographical coverage or type of service available and can only be activated within 12 hours or longer. Surge capacity has never been assessed for “most severe” scenario. ",
      '1 - Surge capacity is theoretically available but has never been assessed or tested for "most probable" scenario. ',
      "0 - No surge capacity identified. ",
    ]
  ),
  makeQuestion(
    "A8.3 To what extent can care be maintained for those who are already sick or dependent?",
    "Optional: please provide justification for answer A8.3",
    [
      '5 - Care could be maintained in "most severe" scenario for all categories of existing patients. If patients need to be moved, transportation facilities and routes are known to have required capacity and resilience. ',
      '4 - Care could be maintained in "most probable" scenario for all categories of existing patients. If patients need to be moved, transportation facilities and routes are known to have required capacity and resilience. ',
      '3 - Some impacts under "most probable" scenario on care for specific categories of patients. Movement of some patients likely to be problematic. More widespread impacts under "most severe" scenario on care for specific categories of patients. Movement of many patients likely to be problematic. ',
      '2 - More widespread impacts under "most probable" scenario on care for specific categories of patients. Movement of many patients likely to be problematic. Serious impacts under "most severe" scenario on care of almost all existing patients, with movement likely to be possible only in most urgent cases. ',
      '1 - Serious impacts under "most probable" scenario on care of almost all existing patients, with movement likely to be possible only in most urgent cases. Under "most severe" scenario, care of existing patients would fail completely. ',
      '0 - Care of existing patients would fail completely or almost completely under "most probable" scenario. ',
    ]
  ),
  makeQuestion(
    "A9.1 To what extent do early warning systems exist for impending emergencies that have potential health effects?",
    "Optional: please provide justification for answer A9.1",
    [
      "5 - Comprehensive and effective monitoring exists and will deliver effective early warnings to address the health risks and impacts for all hazards that a city faces. They will allow time for reaction (as far as technology permits). Warnings are seen as reliable and specific to the city.",
      "4 - Comprehensive monitoring exists even if it is not fully effective in all cases. Warnings exist but warning time maybe less than technology currently permits. Warnings are seen as reliable and specific.",
      "3 - Monitoring exists for most likely healthcare risks and is broadly effective, but one or more key risks is not covered. Some hazards are excluded, and warning time may be less than technology permits. ",
      "2 - Some monitoring exists but has significant gaps. Warning time is less than technology permits and there may also be some false positives: reliability of warnings may therefore be perceived as questionable. ",
      "1 - Monitoring is rudimentary at best and may not deliver warnings. Warnings seen as ad hoc and unreliable. Likely to be ignored.",
      "0 - No monitoring or warnings.",
    ]
  ),
  makeQuestion(
    "A9.2 To what extent are public health sector and professionals integrated with the emergency management team? ",
    "Optional: please provide justification for answer A9.2",
    [
      "5 - Public health sector is fully represented and engaged on the emergency management team and integrated into all emergency decision taking. Engagement has been tested via drills (within the last year) or live response. ",
      "4 - Public health is integrated but via remote input (phone, messaging). Engagement has been tested, but maybe more than 12 months ago.",
      "3 - Public health is represented but engagement has not been tested in 3 years; or represented, but some key disciplines are omitted. ",
      "2 - Disaster management processes provide for public health to be consulted, but in the follow-up to events, not as they happen. No testing of processes. ",
      "1 - Disaster management relies on ad hoc phone calls to public health professionals and facilities. ",
      "0 - Public health is effectively disengaged from disaster management. ",
    ]
  ),
  makeQuestion(
    "A9.3 To what extent are the needs of higher risk populations considered, such as citizens with preexisting medical conditions, disabilities or loss of function that may mean that they require additional support? ",
    "Optional: please provide justification for answer A9.3",
    [
      "5 - All citizens likely to require extra additional support or specific measures city-wide are identified and provisions exist to help them. ",
      "4 - 95% of citizens likely to require additional support or specific measures city-wide are identified and provisions exist to help them.",
      "3 - 75% of citizens likely to require additional support or specific measures city-wide are identified and provisions exist to help them. ",
      "2 - 50% of citizens likely to require additional support or specific measures city-wide are identified but provision does not exist to help all of them. ",
      "1 - Less than 50% of citizens likely to require additional support or specific measures are identified and there are widespread gaps in provisions to help them. ",
      "0 - No provision to identify or provide additional support or specific measures to citizens requiring extra help. ",
    ]
  ),
  makeQuestion(
    "A9.4 To what extent can the city supply items and equipment required to maintain public health during and after a disaster. ",
    "Optional: please provide justification for answer A9.4",
    [
      "5 - A comprehensive list of required items exists, and tested plans are known to be adequate to deliver them rapidly to the entire population. ",
      "4 - A list exists but it may not be comprehensive, and plans may not be tested or fully adequate for the entire city. ",
      "3 - A list exists, and key items will be available to 75% of the population. ",
      "2 - No list but stockpiles and supplies exist for some items. Distribution capability may reach 50% of the population. ",
      "1 - Some stocks of key items exist but no attempt to plan these, and distribution mechanism unlikely to be successful even if it exists at all. ",
      "0 - No attempt to address this issue. ",
    ]
  ),
  makeQuestion(
    "A10.1 To what extent do comprehensive post event public health plans exist?",
    "Optional: please provide justification for answer A10.1",
    [
      '5 - Fully comprehensive plans exist addressing longer term public health needs after "most probable" and "most severe" scenario. ',
      '4 - Fully comprehensive plans exist addressing longer term public health needs after "most probable" scenario. ',
      '3 - Plans exist for post "most probable" event but with some shortfalls. More significant shortfalls for "most severe" scenario.',
      '2 - Plans exist for post "most probable" event but with more significant shortfalls. Generalized inadequacy for "most severe" scenario.',
      '1 - Plans exist for post "most probable" event but with generalized inadequacy. ',
      "0 - No plan",
    ]
  ),
  makeQuestion(
    "A10.2 To what extent do formalized mechanism to learn from performance of public health system before, during and after disasters exist?",
    "Optional: please provide justification for answer A10.2",
    [
      "5 - Defined learning mechanism exists that integrates public health with other lessons and has been used with demonstrable results. ",
      "4 - Defined learning mechanism exists that integrates public health with other lessons but has not yet been used - no disasters. ",
      "3 - Learning will take place via a public health review mechanism, but it is unilateral or bilateral only - lessons remain within functional public health stovepipe and there is no attempt to integrate public health learnings with other disciplines within the city. Likewise, public health fails to influence learnings in other services. ",
      "2 - No real defined mechanism, but ad hoc learning exercises either have been used or may be expected in future disasters.",
      "1 - Scattered and fleeting attempts to learn and improve in the past have occurred or are anticipated in the future. ",
      "0 - No attempt to learn and improve.",
    ]
  ),
];

//export const whoSurveyE = makeSurvey(englishQuestions, "English", "WHO");
