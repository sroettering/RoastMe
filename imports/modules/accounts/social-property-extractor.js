export default SPE = class SocialPropertyExtractor {
  static getEmail(user) {
    const service = user && user.services.facebook ? 'facebook' : 'google';
    return user ? user.services[service].email : '';
  }
}
