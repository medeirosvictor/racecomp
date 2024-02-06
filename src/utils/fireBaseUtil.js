export const fromLeaguesService = ownedLeague => {
    console.log(ownedLeague)
    return {
    game : ownedLeague._document.data.value.mapValue.fields.game?.stringValue,
    selectedPlatforms: ownedLeague._document.data.value.mapValue.fields.platform.arrayValue.values.map(platform => platform?.stringValue),
    pilots: ownedLeague._document.data.value.mapValue.fields.pilots?.arrayValue?.values.map(pilot => pilot?.referenceValue),
    races : ownedLeague._document.data.value.mapValue.fields.races?.arrayValue.values.map(race => race?.referenceValue),
    title :ownedLeague._document.data.value.mapValue.fields.leagueName.stringValue,
    startDate:ownedLeague._document.data.value.mapValue.fields?.stringValue,
}}

