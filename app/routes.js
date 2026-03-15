const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select who this application is for.' }
    return res.render('applicant-type')
  }
  if (answer === 'myself') {
    return res.redirect('/mobility-condition')
  } else if (answer === 'someone-else') {
    return res.redirect('/mobility-condition')
  }
  res.redirect('/mobility-condition')
})

router.get('/mobility-condition', function (req, res) {
  res.render('mobility-condition')
})

router.post('/mobility-condition', function (req, res) {
  const answer = req.session.data['mobility-condition']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'mobility-condition': 'Select yes if you have a permanent disability that affects your mobility.' }
    return res.render('mobility-condition')
  }
  if (answer === 'yes') {
    return res.redirect('/condition-type')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-mobility-condition')
  }
  res.redirect('/condition-type')
})

router.get('/ineligible-mobility-condition', function (req, res) {
  res.render('ineligible-mobility-condition')
})

router.get('/condition-type', function (req, res) {
  res.render('condition-type')
})

router.post('/condition-type', function (req, res) {
  const answer = req.session.data['condition-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'condition-type': 'Select which option best describes your condition.' }
    return res.render('condition-type')
  }
  if (answer === 'walking-difficulty') {
    return res.redirect('/supporting-evidence')
  } else if (answer === 'visual-impairment') {
    return res.redirect('/supporting-evidence')
  } else if (answer === 'arm-disability') {
    return res.redirect('/supporting-evidence')
  } else if (answer === 'mental-health') {
    return res.redirect('/supporting-evidence')
  } else if (answer === 'none-apply') {
    return res.redirect('/ineligible-condition-type')
  }
  res.redirect('/supporting-evidence')
})

router.get('/ineligible-condition-type', function (req, res) {
  res.render('ineligible-condition-type')
})

router.get('/supporting-evidence', function (req, res) {
  res.render('supporting-evidence')
})

router.post('/supporting-evidence', function (req, res) {
  const answer = req.session.data['supporting-evidence']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'supporting-evidence': 'Select whether you have supporting evidence.' }
    return res.render('supporting-evidence')
  }
  if (answer === 'yes') {
    return res.redirect('/full-name')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-supporting-evidence')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-supporting-evidence', function (req, res) {
  res.render('ineligible-supporting-evidence')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter the full name.' }
    return res.render('full-name')
  }
  res.redirect('/date-of-birth')
})

router.get('/date-of-birth', function (req, res) {
  res.render('date-of-birth')
})

router.post('/date-of-birth', function (req, res) {
  const answer = req.session.data['date-of-birth']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'date-of-birth': 'Enter the date of birth.' }
    return res.render('date-of-birth')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('BB')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
