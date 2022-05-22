import { Command } from '../../structures/Command';
import { getMemberBaseId } from '../../utils/Other';
import { ErrorEmbed, SuccessEmbed } from '../../utils/Embed';
import { KARMA_FOR_BAN, KARMA_FOR_MUTE, KARMA_FOR_WARN } from '../../static/Punishment';

export default new Command({
  name: 'karma',
  category: 'Moderation',
  aliases: [],
  description: `Показывает карму пользователя
  
  Одна карма = +1% к времени мута.
  За один варн даётся ${KARMA_FOR_WARN} кармы. За один мут - ${KARMA_FOR_MUTE} кармы. За один бан - ${KARMA_FOR_BAN} кармы.`,
  examples: [
    {
      description: 'karma @TestUser',
      command: 'Показать карму участника @TestUser',
    },
  ],
  usage: 'karma [пользователь]',
  run: async ({ client, message }) => {
    const member = message.mentions.members.first() || message.member;

    const karma = await client.service.getKarma(getMemberBaseId(member));

    if (!karma) {
      const embed = ErrorEmbed('У вас нет кармы');
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      return;
    }

    const embed = SuccessEmbed(`Ваша карма: ${karma}`);

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    return;
  },
});
