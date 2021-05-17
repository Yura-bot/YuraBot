var converter = new showdown.Converter();

  var switches = {
    title: false,
    url: false,
    icon: false,
    useVars: false
  };

  var fields = 0;

  var source = '';

  var embed = {
    title: '',
    author: {
      name: '',
      url: '',
      icon: ''
    },
    fields: [{}],
    description: '',
    url: '',
    thumb_url: '',
    color: '',
    footer: ''
  };

  function resetEmbed() {
    $('.embed-inner').html('');
    $('.embed-footer').remove();
    $('.embed-thumb').remove();
  }

  function updateEmbed(embed) {
    resetEmbed();

    // add basic embed generation to source
    source = 'embed=discord.Embed(';

    if (embed.url) {
      $('.embed-inner').append('<div class="embed-title"><a href="' + embed.url + '">' + embed.title + '</a></div>');

      // update source
      if (switches.useVars) {
        source += 'title=' + embed.title + ', url=' + embed.url;
      } else {
        source += 'title="' + embed.title + '", url="' + embed.url + '"';
      }
    } else if (embed.title.length === 0) {
      source += "";
    } else {
      $('.embed-inner').append('<div class="embed-title">' + embed.title + '</div>');

      // update source
      if (switches.useVars) {
        source += 'title=' + embed.title;
      } else {
        source += 'title="' + embed.title + '"';
      }

    }

    if (embed.description) {
      $('.embed-inner').append('<div class="embed-description">' + converter.makeHtml(embed.description) + '</div>');

      if (embed.title.length > 0 || embed.url.length > 0) {
        source += ', '
      }

      // update source
      if (switches.useVars) {
        source += 'description=' + embed.description;
      } else {
        source += 'description="' + embed.description + '"';
      }
    }

    if (embed.color) {
      $('.side-colored').css('background-color', embed.color);

      if (embed.title.length > 0 || embed.url.length > 0) {
        source += ', '
      }

      // update source
      source += 'color=0x' + embed.color.substr(1);
    }

    // finished the basic setup
    source += ')\n';

    if (embed.author.name) {
      // add author to source
      source += 'embed.set_author(';

      $('.embed-title').before('<div class="embed-author"><a class="embed-author-name" href="' + embed.author.url + '">' + embed.author.name + '</a></div>');

      // update source
      if (switches.useVars) {
        source += 'name=' + embed.author.name;
      } else {
        source += 'name="' + embed.author.name + '"';
      }

      if(embed.author.url) {
        source += ', ';

        if (switches.useVars) {
          source += 'url=' + embed.author.url;
        } else {
          source += 'url="' + embed.author.url + '"';
        }
      }

      if (embed.author.icon) {
        $('.embed-author-name').before('<img class="embed-author-icon" src="' + embed.author.icon + '" />');

        source += ', ';

        // update source
        if (switches.useVars) {
          source += 'icon_url=' + embed.author.icon;
        } else {
          source += 'icon_url="' + embed.author.icon + '"';
        }
      }

      // finish author
      source += ')\n';
    }

    if (embed.thumb_url) {
      // add thumbnail
      source += 'embed.set_thumbnail(';

      $('.card.embed .card-block').append('<img class="embed-thumb" src="' + embed.thumb_url + '" />');
      $('.embed-thumb').height($('.embed-thumb')[0].naturalHeight);

      // update source
      if (switches.useVars) {
        source += 'url=' + embed.thumb_url;
      } else {
        source += 'url="' + embed.thumb_url + '"';
      }

      // finish thumbnail
      source += ')\n';
    }

    if (embed.footer) {
      $('.card.embed').append('<div class="embed-footer"><span>' + embed.footer + '</span></div>');

      // add footer
      if (switches.useVars) {
        source += 'embed.set_footer(text=' + embed.footer + ')\n';
      } else {
        source += 'embed.set_footer(text="' + embed.footer + '")\n';
      }
    }

    // add send function
    source += 'await ctx.send(embed=embed)\n';
  }

  // run once on startup
  updateEmbed(embed);

  function updateTitle(value) {
    embed.title = value || '';
    updateEmbed(embed);
  }

  function updateUrl(value) {
    embed.url = value || '';
    updateEmbed(embed);
  }

  function updateThumb(value) {
    embed.thumb_url = value || false;
    updateEmbed(embed);
  }

  function updateDescription(value) {
    embed.description = value || '';
    updateEmbed(embed);
  }

  function updateColor(value) {
    embed.color = value || false;
    updateEmbed(embed);
  }

  function updateAuthorName(value) {
    embed.author.name = value || '';
    updateEmbed(embed);
  }

  function updateAuthorUrl(value) {
    embed.author.url = value || '';
    updateEmbed(embed);
  }

  function updateAuthorIcon(value) {
    embed.author.icon = value || '';
    updateEmbed(embed);
  }

  function updateFooter(value) {
    embed.footer = value || '';
    updateEmbed(embed);
  }

  $('#form').submit(function (e) {
    e.preventDefault();
  });

  $('#useVars').click(function () {
    switches.useVars = !switches.useVars;
    updateEmbed(embed);
  });