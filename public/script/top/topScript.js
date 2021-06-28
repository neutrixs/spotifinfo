typeSelected = 0
timeSelected = 0

const changeType = function(type){
    let isAddLight = false
    if(window.localStorage['dark'] == 'false') isAddLight = true

    let name = ['Track','Artist']
    let nameLC = ['track','artist']

    $(`#listTrack`).addClass('none')
    $(`#listArtist`).addClass('none')

    $(`#list${name[type]}`).removeClass('none')
    typeSelected = type

    $(`#trackSelector`).removeClass('selected').removeClass('selectedLight')
    $(`#artistSelector`).removeClass('selected').removeClass('selectedLight')

    $(`#${nameLC[type]}Selector`).addClass(isAddLight?'selectedLight':'selected')
}
const changeTime = function(type){
    let isAddLight = false
    if(window.localStorage['dark'] == 'false') isAddLight = true

    $('#listTrack0').addClass('none')
    $('#listTrack1').addClass('none')
    $('#listTrack2').addClass('none')
    $('#listArtist0').addClass('none')
    $('#listArtist1').addClass('none')
    $('#listArtist2').addClass('none')

    $(`#listTrack${type}`).removeClass('none')
    $(`#listArtist${type}`).removeClass('none')

    $('#timeSelector0').removeClass('selected').removeClass('selectedLight')
    $('#timeSelector1').removeClass('selected').removeClass('selectedLight')
    $('#timeSelector2').removeClass('selected').removeClass('selectedLight')

    $(`#timeSelector${type}`).addClass(isAddLight?'selectedLight':'selected')
    timeSelected = type
}

$('#trackSelector').off().on('click',()=>{changeType(0)})
$('#artistSelector').off().on('click',()=>{changeType(1)})
$('#timeSelector0').off().on('click',()=>{changeTime(0)})
$('#timeSelector1').off().on('click',()=>{changeTime(1)})
$('#timeSelector2').off().on('click',()=>{changeTime(2)})