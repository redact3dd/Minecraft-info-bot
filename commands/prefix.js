const servers = require('../exports/exports.js');

/*
prefix
prefix set <prefix>
prefix role set <role> [role]
prefix role add <role> [role]
prefix role remove <role>, [role]
prefix role clear
*/

module.exports = {
    name: 'prefix',
    description: 'Prefix releated commands',
    args: '[set/role] [set/add/remove/clear]',
    execute(message, args) {
        //send server's prefix if there're no arguments
        if(!args.length) {
            message.channel.send('This server\'s prefix is ' + servers.getPrefix(message.guild.id));
            return;
        }
        //prefix set
        if(args[0] === 'set') {
            const authorisedRoles = servers.getRoles(message.guild.id);
            const memberRoles = message.member.roles.cache.array();
            let authorised = message.member.hasPermission('ADMINISTRATOR');
            //check if member has an authorised role or is an admin
            memberRoles.forEach(role => {
                if(authorisedRoles.includes(role.id)) { authorised = true }
            });
            if(!authorised) { return message.channel.send('You do not have the permission to use this command')}
            //check if a prefix is specified
            if(args[1]) {
                //update the prefix
                servers.setPrefix(message.guild.id, args[1])
                    .then(response => {
                        message.channel.send(response.message);
                    })
                    .catch(err => {
                        message.channel.send(err.message);
                        console.error(err.error);
                    });
            }
            else {
                message.channel.send('Please provide a valid prefix');
            }
        }
        //prefix role
        else if(args[0] === 'role') {
            //send list of authorised roles
            if(['set', 'add', 'remove', 'clear'].includes(args[1])) {
                const authorisedRoles = servers.getRoles(message.guild.id);
                const memberRoles = message.member.roles.cache.array();
                let authorised = message.member.hasPermission('ADMINISTRATOR');
                //check if member has an authorised role or is an admin
                memberRoles.forEach(role => {
                    if(authorisedRoles.includes(role.id)) { authorised = true }
                });
                if(!authorised) { return message.channel.send('You do not have the permission to use this command')}
                //remove 'role' arg
                args.shift();
                if(args[0] === 'set') {
                    args.shift();
                    servers.removeRole(message.guild.id, servers.getRoles(message.guild.id))
                        .then(() => {
                            servers.addRole(message.guild.id, args)
                                .then(response => {
                                    return message.channel.send(response.message);
                                })
                                .catch(err => {
                                    message.channel.send(err.message);
                                    return console.error(err.error);
                                });
                        })
                        .catch(err => {
                            message.channel.send(err.message);
                            return console.error(err.error);
                        });
                }
                else if(args[0] === 'add') {
                    args.shift();
                    servers.addRole(message.guild.id, args)
                        .then(response => {
                            return message.channel.send(response.message);
                        })
                        .catch(err => {
                            message.channel.send(err.message);
                            return console.error(err.error);
                        });
                }
                else if(args[0] === 'remove') {
                    args.shift();
                    servers.removeRole(message.guild.id, args)
                        .then(response => {
                            return message.channel.send(response.message);
                        })
                        .catch(err => {
                            message.channel.send(err.message);
                            return console.error(err.error);
                        });
                }
                else if(args[0] === 'clear') {
                    servers.removeRole(message.guild.id, servers.getRoles(message.guild.id))
                        .then(response => {
                            return message.channel.send(response.message);
                        })
                        .catch(err => {
                            message.channel.send(err.message);
                            return console.error(err.error);
                        });
                }
            }
            //list of admin roles
            else {
                let roles = servers.getRoles(message.guild.id);
                if(roles.length) {
                    let response = 'Roles allowed to change the prefix:';
                    roles.forEach(role => {
                        response += ` <@&${role}>`;
                    });
                    return message.channel.send(response);
                }
                return message.channel.send('Server administrators are the only ones who can change the prefix');
            }
        }
    }
}